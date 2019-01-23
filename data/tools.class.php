<?php 
/**
 * - 工具类
 * @author kook m@214.tech
 * @version 1.0
 * @copyright © 2017-2027 蔡萌
 * @license http://www.caimeng.xin
 * <br/>
 * 2017-10-17 下午04:11:30
 */
	class Tools{
	/**
	 * - 解码unicode编码 
	 * @param String $data - 
	 * @return {String}
	 */
		public static function unicode_decode($data){
			function replace_unicode_escape_sequence($match){
				return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
			}
			return preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', $data);
		}
	/**
	 * - curl请求
	 * @param String $url - 接口的URL
	 * @param String $type - 请求类型。默认为get
	 * @param String $res - 返回数据类型。默认为str字符串直接返回。取值：arr、str
	 * @param Array $data - post、get请求参数
	 * @param Array $files - 上传文件数据信息，post请求
	 * @return {String}
	 */
		public static function http_curl($url, $type='get', $res='str', $data, $files){
			if(($type == 'get' || $type == 'GET') && $data)$url .= "?".self::get_url_par($data);
			// 1.初始化
			$ch = curl_init();
			// 2.设置参数
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			// CURLOPT_CONNECTTIMEOUT 可以设置为10秒，标识如果服务器10秒内没有响应，脚本就会断开连接
//			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
			// CURLOPT_TIMEOUT 可以设置为100秒，文件100秒内没有下载完成，脚本将会断开连接
//			curl_setopt($ch, CURLOPT_TIMEOUT, 100);
			$file_url = array(); // 上传文件的路径
			if($type == 'post' || $type == 'POST'){
				if($files)$file_url = self::post_files($ch, $data, $files);
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			}
			// 绕过ssl验证(https请求时要关闭)
//			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
//			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
			// 3.调用接口(采集)
			$output = curl_exec($ch);
			// 4.关闭curl
			curl_close($ch);
			if(curl_errno($ch)){
				return curl_error($ch);
			}else{
				foreach($file_url as $k=>$v)unlink($v); // 删除转存的文件
				switch($res){
					case 'arr':
						return self::json_decode($output); // json_decode($output, true);
					case 'json':
					default:
						return $output;
				}
			}
		}
	/**
	 * - 得到GET请求的URL参数字符串
	 * @param Array $arr - 
	 * @return {String}
	 */
		public static function get_url_par($arr){
			$str = '';
			foreach($arr as $k=>$v)$str.=$k."=".$v."&";
			return substr($str, 0, strlen($str) - 1);
		}
	/**
	 * - 初始化POST请求的$_FILES
	 * @param $ch -
	 * @param Array $data - 待处理的请求的参数
	 * @param Array $files - 
	 * @return {Array}
	 * @name【注意：临时文件夹./tmp】
	file: "file"=>array(
		"name"=>"",
		"type"=>"",
		"tmp_name"=>"",
		"error"=>4,
		"size"=>0
	)
	file[]: "file"=>array(
		"name"=>array("kook.jpg"),
		"type"=>array("image/jpeg"),
		"tmp_name"=>array("C:\Windows\Temp\php7711.tmp"),
		"error"=>array(0),
		"size"=>array(28480)
	)
	 */
		public static function post_files(&$ch, &$data, $files){
			$file_url = array();
			if(count($files) > 0){
				// 转存文件
				foreach($files as $k=>$v){
					if(is_array($files[$k]["name"])){ // 多个文件
						$url0 = array();
						foreach($files[$k]["name"] as $k0=>$v0){
							if($files[$k]["error"][$k0] == 0){
								copy(
									$files[$k]['tmp_name'][$k0],
									"./tmp/".$files[$k]["name"][$k0] // 转存位置
								);
								$file_url[$k.'['.$k0.']'] = "./tmp/".$files[$k]["name"][$k0];
							}
						}
					}else{ // 单个文件
						if($files[$k]["error"] == 0){
							copy(
								$files[$k]['tmp_name'],
								"./tmp/".$files[$k]["name"] // 转存位置
							);
							$file_url[$k] = "./tmp/".$files[$k]["name"];
						}
					}
				}
				if(class_exists('\CURLFile')){ // php>=5.5
					curl_setopt($ch, CURLOPT_SAFE_UPLOAD, true);
					foreach($file_url as $k=>$v)$data[$k] = new \CURLFile(realpath($v));
				}else{ // php<=5.5
					if(defined('CURLOPT_SAFE_UPLOAD'))curl_setopt($ch, CURLOPT_SAFE_UPLOAD, false);
					foreach($file_url as $k=>$v)$data[$k] = '@'.realpath($v);
				}
			}
			return $file_url;
		}
	/**
	 * - 得到IP地址
	 * @return {String}
	 */
		public static function ip(){
			$realip = '';
			$unknown = 'unknown';
			if(isset($_SERVER)){
				if(isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR']) && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], $unknown)){
					$arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
					foreach($arr as $ip){
						$ip = trim($ip);
						if ($ip != 'unknown'){
							$realip = $ip;
							break;
						}
					}
				}else if(isset($_SERVER['HTTP_CLIENT_IP']) && !empty($_SERVER['HTTP_CLIENT_IP']) && strcasecmp($_SERVER['HTTP_CLIENT_IP'], $unknown)){
					$realip = $_SERVER['HTTP_CLIENT_IP'];
				}else if(isset($_SERVER['REMOTE_ADDR']) && !empty($_SERVER['REMOTE_ADDR']) && strcasecmp($_SERVER['REMOTE_ADDR'], $unknown)){
					$realip = $_SERVER['REMOTE_ADDR'];
				}else{
					$realip = $unknown;
				}
			}else{
				if(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), $unknown)){
					$realip = getenv("HTTP_X_FORWARDED_FOR");
				}else if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), $unknown)){
					$realip = getenv("HTTP_CLIENT_IP");
				}else if(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), $unknown)){
					$realip = getenv("REMOTE_ADDR");
				}else{
					$realip = $unknown;
				}
			}
			$realip = preg_match("/[\d\.]{7,15}/", $realip, $matches) ? $matches[0] : $unknown;
			return $realip;
		}
	/**
	 * - 根据经纬度得到距离 
	 * @param Float $latA - A点的纬度
	 * @param Float $lonA - A点的经度
	 * @param Float $latB - B点的纬度
	 * @param Float $lonB - B点的经度
	 * @param {Float}
	 * @name 6378.137 - 赤道半径
	 * @name 6356.755 - 极半径
	 * @name 6371.004 - 平均半径
	 * （千米）
	 * @name $C = sin(MLatA)*sin(MLatB)*cos(MLonA-MLonB) + cos(MLatA)*cos(MLatB);
	 * @name $Distance = R*Arccos(C)*Pi/180
	 */
		public static function lat_lon_distance($latA, $lonA, $latB, $lonB){
			$r = 6378.137;
			$c = sin($lat1)*sin($lat2)*cos($lng1-$lng2) + cos($lat1)*cos($lat2);
			return $r*acos($c)*M_PI/180;
		}
	/**
	 * - 根据分割的起始字符串和终止字符串得到分割后的的数据数组。
	 * @param String $v - 数据源
	 * @param String $start - 起始字符串
	 * @param String $end - 结束字符串
	 * @return {Array}
	 * @name 替换字符为空：换行符、Tab缩进符
	 * @name explode($start, $v) - 根据起始字符串 $start 分割为数组
	 * @name strstr('被搜索的字符串（数据源）', '搜索的字符串', true) - 截取字符串。第三个参数默认值false，取值为 true，返回‘搜索的字符串’之前的字符串，否则返回‘搜索的字符串’之后的字符串
	 */
		public static function explode($v, $start, $end){
			$arr = array();
			$str_arr = explode($start, $v);
			for($i=1; $i<count($str_arr); $i++){
				array_push($arr, str_replace(array("\r\n","\r","\n","\t"), "", strstr($str_arr[$i], $end, true)));
			}
			return $arr;
		}
	/**
	 * - Object、Array 转换为 JSON 字符串
	 * @param Object/Array $array - 数据
	 * @param Boolean $obj_null - object对象时数据为 null 时是否初始化。取值：
	 * <br>	1. true: 初始化为空，即：""
	 * <br>	2. false: 不初始化。默认缺省值
	 * @param Boolean $quot - JSON字符串中的双引号是否替换为&quot;占位符。取值：
	 * <br>	1. true: 启动替换
	 * <br>	2. false: 不替换。默认缺省值
	 * @return {String}
	 */
		public static function json_encode($array, $obj_null = false, $quot = false){
			if(defined('JSON_UNESCAPED_UNICODE')){ // 从 PHP 5.4.0 起, 增加了这个选项
				return $quot ? 
					str_replace('"','&quot;',json_encode($array, JSON_UNESCAPED_UNICODE)) : 
					json_encode($array, JSON_UNESCAPED_UNICODE);
			}
			if(is_string($array) || is_int($array)){
				$text = $array;
				$text = str_replace('\\', '\\\\', $text);
				$text = str_replace(
					array("\r", "\n", "\t", "\""),
					array('\r', '\n', '\t', '\\"'),
					$text
				);
				return $quot ? str_replace('"','&quot;','"'.$text.'"') : '"'.$text.'"';
			}else if(is_array($array) || is_object($array)){
				$arr = array();
				$is_obj = is_object($array) || (array_keys($array) !== range(0, count($array) - 1)); // 是对象
				foreach($array as $k=>$v){
					if($is_obj){ // 对象
						if($obj_null){ // 初始化为空
							$arr[] = self::json_encode($k).':'.(isset($v) ? (is_bool($v) ? ($v ? 'true' : 'false') : self::json_encode($v)) : '""');
						}else{ // 不初始化
							isset($v) ? $arr[] = self::json_encode($k).':'.(is_bool($v) ? ($v ? 'true' : 'false') : self::json_encode($v)) : null;
						}
					}else{ // 有序的数组
						$arr[] = self::json_encode($v);
					}
				}
				if($is_obj){
					return $quot ? str_replace('"','&quot;','{'.join(',', $arr).'}') : '{'.join(',', $arr).'}';
				}else{
					return $quot ? str_replace('"','&quot;','['.join(',', $arr).']') : '['.join(',', $arr).']';
				}
			}else{
				return $quot ? str_replace('"','&quot;',$array.'') : $array.'';
			}
		}
	/**
	 * - 字符串转换为数组，加强版！当处理后仍不是数组将把其处理为数组
	 * @param String $json - 
	 * @return {Array}
	 */
		public static function json_decode($json){
//			$arr = json_decode($json);
			$arr = json_decode($json, true);
			if(isset($arr)){
				is_array($arr) ? null : $arr = array($arr);
			}else{
				$arr = array($json);
			}
			return $arr;
		}
	/**
	 * - 判断是否是关联数组
	 * @param Array $arr - 数据源
	 * @return Boolean - 
	 * <br>	1. true: 关联 [Object/Array]
	 * <br>	2. false: 非关联，即：不配置特定键的数组[String/Boolean/Integer/Array]
	 * @name 注意：对象是特殊的关联数组
	 */
		public static function is_assocArr($arr){
			return array_keys($arr) !== range(0, count($arr) - 1);
		}
	/**
	 * - 把数组初始化为关联数组 
	 * @param Array $arr - 
	 * @return {Array}
	 */
		public static function init_assocArr(&$arr){
			foreach($arr as $k=>$v){
				if(is_integer($k) && is_string($v)){
					$arr[$v] = array();
					unset($arr[$k]);
				}
			}
			return $arr;
		}
	/**
	 * - Object 对象转换为数组
	 * @param Object $obj - 对象数据
	 * @return {Array}
	 */
		public static function obj_to_arr($obj){
			if(is_object($obj)){
				$arr = array();
				foreach($obj as $k=>$v){
					$arr[$k] = $v;
				}
				return $arr;
			}
			return $obj;
		}
	/**
	 * - Array -> Object 数组换对象
	 * @param Array $arr - 数据源
	 * @return {Object}
	 */
		public static function arr_to_obj($arr){
			if(gettype($arr) != 'array'){
				return;
			}
			foreach($arr as $k => $v){
				if(gettype($v) == 'array' || getType($v) == 'object'){
					$arr[$k] = (object)array_to_object($v);
				}
			}
			return (object)$arr;
		}
	/**
	 * - 根据关联数组的元素键得到下一个元素的键
	 * @param Array $array - 关联数组元素
	 * @param String/Integer $curr_key - 关联数组的键
	 * @param Boolean $loop - 环，表示当最后一个元素获得下一个元素时：false,表示返回值为 null。true,表示返回第一个元素的键
	 * @return {String/Integer}
	 * @name reset() - 得到数组的首个元素
	 */
		public function getNext(&$array, $curr_key){
			$next = null;
			reset($array);
			do{
				$tmp_key = key($array);
				$res = next($array);
			}while(($tmp_key != $curr_key) && $res);
			if(!$res && $loop){
				$res = reset($array);
			}
			if($res){
				$next = key($array);
			}
			return $next;
		}
	/**
	 * - 根据关联数组的元素键得到上一个元素的键
	 * @param Array $array - 关联数组元素
	 * @param String/Integer $curr_key - 关联数组的键
	 * @return {String/Integer}
	 */
		public function getPrev(&$array, $curr_key){
			end($array); // 最后一个元素
			$prev = key($array);
			do{
				$tmp_key = key($array);
				$res = prev($array);
			}while(($tmp_key != $curr_key) && $res);
			if($res){
				$prev = key($array);
			}else{
				$prev = null;
			}
			return $prev;
		}
	/**
	 * - 匹配开头
	 * @param $str - 字符串
	 * @param $mate - 匹配的字符串
	 * @return {Boolean}
	 */
		public static function mate_start($str, $mate){
			if(strpos($str, $mate) === 0){
				return true;
			}
			return false;
		}
	/**
	 * - 验证数组 $arr 的值中是否存在 $val
	 * @param Array $arr
	 * @param String $val
	 * @return {Boolean}
	 */
		public static function check_arr_val($arr, $val){
			foreach($arr as $k=>$v){
				if($v === $val){
					return true;
				}
			}
			return false;
		}
	/**
	 * - 根据值得到值所在数组中的键
	 * @param Array $arr - 数组数据源
	 * @param String/Integer $val - 值
	 * @param Boolean $all - 是否遍历所有，得到所有的键。取值：
	 * <br>	1. true: 遍历所有
	 * <br>	2. false: 不遍历所有，只得到首个。默认值
	 * @return {Array}
	 */
		public static function get_arr_k_by_v($arr, $val, $all = false){
			$key = array();
			foreach($arr as $k=>$v){
				if($v === $val){
					$key[] = $k;
					if(!$all){
						return $k;
					}
				}
			}
			return $key;
		}
	/**
	 * - 得到函数被调用的函数名称集合 
	 * @param String/Object $class - 类名/类对象，类名存在时，将根据类名以及$i返回对应的函数名
	 * @param Integer $i - 配合类名参数使用，表示第几个函数，默认值为1
	 * @return {Array/String}
	 */
		public static function get_backtrace_arr($class, $i = 1){
			is_object($class) ? $class = get_class($class) : null;
			$backtrace = debug_backtrace();
			array_shift($backtrace);
			$arr = array();
			$x = 1;
			foreach($backtrace as $k=>$v){
				if(isset($class) && $class == $backtrace[$k]['class']){
					if($x == $i){
						return $backtrace[$k]['function'];
					}
					$x++;
				}
				$arr[] = array(
					"class"=>$backtrace[$k]['class'],
					"name"=>$backtrace[$k]['function']
				);
			}
			return $arr;
		}
	}
?>