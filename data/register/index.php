<?php
	header("Access-Control-Allow-Origin: *");
	require_once dirname(__FILE__).'/../tools.class.php';

	$name = 'id'; // ����Ĳ�������
	$method = 'post'; // ����ʽ��ȡֵ��get��post
	$json_name = "index.json"; // JSON�����ļ���



	$method_data = $method == 'get' ? $_GET : $_POST;
	
	if($method_data[$name]){
		$data = array();
		foreach(Tools::json_decode(file_get_contents($json_name)) as $k=>$v){
			if($v[$name]==$method_data[$name])$data = $v;
		}
		echo Tools::json_encode($data);
	}else{
		echo file_get_contents($json_name);
	}
	
?>