/** 
 * KookJS 
 * @author kook <m@214.xin>
 * @version 1.0
 * @datetime 2017-02-11 下午05:58:50
 */
;
(function (window) {
  var me = this,
    /**
     * 工厂，构建kook对象 
     * @param Object/String selector - 选择器
     * 1. DOM元素
     * 2. 选择器表达式
     * @param ? context - 
     */
    my = me.kook = function (selector, context) {
      return new my.fn.init(selector, context);
    };
  /**
   * 配置数据 
   */
  my.kd = (function () {
    return {
      // 项目的根目录路径。根据此路径的相对路径加载资源文件
      root: 'http://192.168.0.118/kook/pos/1.0/api/',
      // kookJs部署的根目录
      kook_root: (function () {
        var js = document.scripts;
        return js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);
      })()
    };
  })();
  /**
   * kook对象原型
   */
  my.fn = my.prototype = {
    // 这才是kook中真正的构造函数
    init: function (selector, context) {
      // 选择的对象
      this.obj = selector.isStr() ? document.querySelectorAll(selector) : [selector];
    },
    /** 得到元素上的样式 
     * 【obj[0]】
     * @param String name - 样式名称
     * @param String v - 赋的样式值
     * @return {String}
     */
    css: function (name, v) {
      var o = this.obj[0];
      if (v) o.style[name] = v;
      return o.currentStyle ? o.currentStyle[name] : getComputedStyle(o, false)[name];
    },
    /** 得到元素的宽高 
     * 【obj[0]】
     * @return {JSON}
     */
    wh: function () {
      var o = this.obj[0],
        h = kook(o).css('height'),
        w = kook(o).css('width');
      return {
        h: parseInt((!h || h == 'auto') ? o.offsetHeight : h),
        w: parseInt((!w || w == 'auto') ? o.offsetWidth : w)
      };
    },
    /** 得到元素位置 
     * 【obj[0]】
     * @return {JSON}
     */
    pos: function () {
      var o = this.obj[0],
        l = kook(o).css('left'),
        t = kook(o).css('top'),
        r = kook(o).css('right'),
        b = kook(o).css('bottom');
      return {
        l: (!l || l == 'auto') ? o.offsetLeft : l,
        t: (!t || t == 'auto') ? o.offsetTop : t,
        r: (!r || r == 'auto') ? o.offsetRight : r,
        b: (!b || b == 'auto') ? o.offsetBottom : b
      };
    },
    /** 操作data-元素，兼容IE9以下的版本的IE浏览器 
     * 【obj[0]】
     * @param String name - 名称
     * @param String/Int/JSON v - 赋的值
     * @return {JSON}
     */
    dataset: function (name, v) {
      var o = this.obj[0],
        data = function () {
          var dataset = {};
          if (!o.dataset) {
            dataset = o.dataset;
          } else {
            var arr = (o.outerHTML.sliceSplit("<", ">")[0] + " ").sliceSplit("data-", '" ');
            for (var k = 0; k < arr.length; k++) {
              var d = arr[k].split('="');
              dataset[d[0]] = d[1];
            }
          }
          return dataset;
        }();
      for (var k in data) {
        data[k] = data[k].replaceG("&quot;", '"');
        data[k] = data[k].isJsonStr() ? data[k].toJson() : data[k];
      }
      if (name) data = data[name];
      if (v) {
        if (v.isJson()) v = (data.isJson() ? data.setJson(v) : v).toStr();
        o.dataset ? o.dataset[name] = v : o.setAttribute('data-' + name, v);
      }
      return data;
    },
    /** 判断元素中的样式是否存在 
     * 【obj[0]】
     * @param String name - 样式名称
     * @return {Boolean}
     * true: 存在
     * false: 不存在
     */
    has_cls: function (name) {
      var o = this.obj[0],
        n = o.className;
      if (n.split(' ').aaa(name) !== -1) return true;
      return false;
    },
    /** 添加样式 
     * @param String name - 样式名称。如：cls、cls0 cls1 cls2
     */
    add_cls: function (name) {
      for (var k = 0; k < this.obj.length; k++) {
        var o = this.obj[k];
        if (o.className) {
          for (var n = 0, arr = name.split(" "); n < arr.length; n++)
            if (!kook(o).has_cls(arr[n])) o.className += " " + arr[n];
        } else {
          o.className = name;
        }
      }
    },
    /** 移除样式 
     * @param String name - 样式名称。如：cls、cls0 cls1 cls2
     */
    rm_cls: function (name) {
      name = name.split(" ");
      for (var k = 0; k < this.obj.length; k++) {
        for (var n = 0, o = this.obj[k]; n < name.length; n++) {
          o.className = (function (cls, v) {
            cls = cls.split(" ");
            for (var n = 0, str = ""; n < cls.length; n++)
              if (v != cls[n]) str += cls[n] + " ";
            return str.substring(0, str.length - 1);
          })(o.className, name[n]);
        }
      }
    },
    /** 切换样式 
     * @param String name - 样式名称。如：cls、cls0 cls1 cls2
     */
    toggle_cls: function (name) {
      for (var k = 0; k < this.obj.length; k++) {
        var o = this.obj[k];
        if (o.className) {
          for (var n = 0, arr = name.split(" "); n < arr.length; n++) kook(o).has_cls(arr[n]) ? kook(o).rm_cls(arr[n]) : o.className += " " + arr[n];
        } else {
          o.className = name;
        }
      }
    },
    /** 判断内容是否溢出 
     * 【obj[0]】
     * @return {Boolean}
     * true: 溢出
     * false: 没有溢出
     */
    overflow: function () {
      var o = this.obj[0];
      return o.scrollHeight > o.clientHeight || o.offsetHeight > o.clientHeight;
    },
    /** get/set HTML代码 
     * 【obj[0]】
     * @param String v - 设置的HTML代码
     * @return {String}
     */
    html: function (v) {
      var o = this.obj[0];
      if (v) o.innerHTML = v;
      return o.innerHTML;
    },
    /** 得到(radio、checkbox)元素的值 
     * 【obj[0]】
     * @return {String}
     */
    val: function () {
      return this.obj[0] ? this.obj[0].value : null;
    },
    /** 得到元素中的name数据 
     * @return {JSON}
     */
    name_data: function () {
      var o = this.obj[0];
      var data = {},
        input = o.querySelectorAll('input[type="text"]'),
        textarea = o.querySelectorAll('textarea');
      for (var i = 0; i < input.length; i++) {
        if (input[i].name) data[input[i].name] = input[i].value;
      }
      for (var i = 0; i < textarea.length; i++) {
        if (textarea[i].name) data[textarea[i].name] = textarea[i].value;
      }
      return data;
    },
    /** 得到form元素的数据 
     * @return {Array}
     */
    /*
    form_data:function(){
    	var o = this.obj[0],
    		data = new FormData(o);
    	console.log(data.get('name')); // 得到FormData中的数据
    	return data;
    },
    */
    /** Ajax请求
     * @param JSON m - 
     * @param function fun - 
     */
    ajax: function (m, fun) {
      m.form = this.obj[0];
      kook.ajax.init(m, fun);
    }
  };
  var event_name = [
    "abort", // 图像加载被中断
    "blur", // 元素失去焦点
    "change", // 用户改变域的内容
    "click", // 鼠标点击某个对象
    "dblclick", // 鼠标双击某个对象
    "error", // 当加载文档或图像时发生某个错误
    "focus", // 元素获得焦点
    "keydown", // 某个键盘的键被按下
    "keypress", // 某个键盘的键被按下或按住
    "keyup", // 某个键盘的键被松开
    "load", // 某个页面或图像被完成加载
    "mousedown", // 某个鼠标按键被按下
    "mousemove", // 鼠标被移动
    "touchmove", // 当手指在屏幕上滑动的时候连续地触发
    "mouseout", // 鼠标从某元素移开
    "touchend", // 当手指从屏幕上离开的时候触发
    "mouseover", // 鼠标被移到某元素之上
    "touchstart", // 当手指触摸屏幕时候触发
    "touchcancel", // 当系统停止跟踪触摸的时候触发
    "mouseup", // 某个鼠标按键被松开
    "reset", // 重置按钮被点击
    "resize", // 窗口或框架被调整尺寸
    "select", // 文本被选定
    "submit", // 提交按钮被点击
    "unload" // 用户退出页面
  ];
  for (var k in event_name) {
    (function (name) {
      me.kook.fn[name] = function (fun) {
        for (var i = 0; i < this.obj.length; i++) my.add.handler(this.obj[i], name, fun);
      }
    })(event_name[k]);
  };
  my.fn.init.prototype = my.fn;
  // 插件...
  /*
   * Object(JSON)插件 
   */
  var is_name0 = {
      Number: "isNum",
      Function: "isFun",
      Boolean: "isBool",
      String: "isStr"
    },
    is_name1 = ["isArr", "isNum", "isFun", "isBool", "isStr", "isNumStr", "isJsonStr"];
  for (var k in is_name0) window[k].prototype[is_name0[k]] = function () {
    return true
  };
  for (var k in is_name1) {
    Object.defineProperty(Object.prototype, is_name1[k], {
      value: function () {
        return false
      },
      writable: true,
      enumerable: false,
      configurable: true
    });
  }
  /** 是否是JSON对象 
   * @return {Boolean}
   * @name value: 该属性对应的值。可以是任何有效的JavaScript值（数值，对象，函数等）。默认为 undefined
   * @name writable: 值为true时，value才能被赋值运算符改变。默认为 false
   * @name enumerable: 值为true时，该属性才能够出现在对象的枚举属性中，即：for..in将不遍历该属性。默认为 false
   * @name configurable: 值为true时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false
   */
  Object.defineProperty(Object.prototype, "isJson", {
    value: function () {
      if (this.isArr() || this.isNum() || this.isFun() || this.isBool() || this.isStr() || this.length == 0) return false;
      var str = JSON.stringify(this); // 将JSON对象转换为字符串
      str = '{' + str.substring(1, str.length - 1) + '}';
      return str.isJsonStr();
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
  /** 得到赋值后的JSON数据???待补充 
   * @param JSON v - 赋值的数据源
   * @return {JSON}
   */
  Object.defineProperty(Object.prototype, "setJson", {
    value: function (v) {
      for (var k in v) this[k] = v[k];
      return this;
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
  /** 检索值对应的索引 
   * my.indexOf
   * first_json_k
   * @param String v - 检索的值。不存时返回首个元素的键值
   * @param Boolean all - 检索所有的。默认值false
   * @return {Int/String/Array}
   */
  Object.defineProperty(Object.prototype, "aaa", {
    value: function (v, all) {
      if (v == undefined) {
        for (var k in this) return k;
      } else {
        if (all) {
          var arr = [];
          for (var k in this)
            if (this[k] == v) arr.push(this.isArr() ? parseInt(k) : k);
          return arr;
        } else {
          for (var k in this)
            if (this[k] == v) return this.isArr() ? parseInt(k) : k;
        }
      }
      return -1;
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
  /** 删除Array/JSON的对应值 
   * @param String v - 删除的值
   * @param Int n - 删除的个数。默认值：所有
   * @return {Array/JSON}
   */
  Object.defineProperty(Object.prototype, "dele", {
    value: function (v, n) {
      var aaa = this.aaa(v, true),
        len = n ? (n < aaa.length ? n : aaa.length) : aaa.length;
      if (this.isArr()) { // Array
        for (var k = 0; k < len; k++) this.splice(aaa[k] - k, 1); // 删除的索引, 删除的数量
      } else { // JSON
        for (var k = 0; k < len; k++) delete this[aaa[k]];
      }
      return this;
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
  /** JSON对象 -> JSON字符串，支持多级JSON数据 
   * @param Object o - 
   * @return {String}
   */
  Object.defineProperty(Object.prototype, "toStr", {
    value: function () {
      var v = '{';
      for (var k in this) {
        v += '"' + k + '":';
        if (this[k].isNum() || this[k].isBool()) {
          v += this[k] + ',';
        } else if (this[k].isJson()) {
          v += this[k].toStr() + ',';
        } else {
          v += '"' + this[k] + '",';
        }
      }
      return v.slice(0, v.length - 1) + '}';
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
  /*
   * Array插件 
   * this.toString() - 数组转化为字符串
   */
  /** 校验数组 
   * @return {Boolean}
   */
  Object.defineProperty(Array.prototype, "isArr", {
    value: function (v) {
      return true
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
  /** 数组数据赋值 
   * @param JSON/Arr/String/Int v - 赋值的数据源
   * @return {Array}
   */
  Object.defineProperty(Array.prototype, "setArr", {
    value: function (v) {
      if (v.isArr()) {
        for (var i in v) this.push(v[i]);
      } else {
        this.push(v);
      }
      return this;
    },
    writable: true,
    enumerable: false,
    configurable: true
  });
  /*
   * Number插件 
   * this.toFixed(n) - 四舍五入处理为指定的位数
   */
  /*
   * Function插件 
   */
  /*
   * Boolean插件 
   */
  /*
   * String插件 
   */
  /** 判断字符串是否是数字 
   * @return {Boolean}
   */
  String.prototype.isNumStr = function () {
      var reg = /^[0-9]*[0-9][0-9]*$/; /* /^[0-9]*[1-9][0-9]*$/、/^[0-9]+.?[0-9]*$/ */
      return reg.test(this);
    },
    /** 是否是JSON字符串 
     * 例：{"m":"蔡萌","c":"陈佳楠"}
     * @return {Boolean}
     */
    String.prototype.isJsonStr = function () {
      // 如果为字符串整数，则返回 false
      if (this % 1 === 0) return false;
      try {
        JSON.parse(this);
        return true;
      } catch (e) {
        try {
          var obj = eval('(' + this + ')');
        } catch (e) {
          return false;
        }
        if (typeof obj == 'object') {
          return 0; // 只能 return 0 、false
        }
        return false;
      }
    };
  /** JSON字符串 -> 为JSON对象 
   * @return {JSON}
   * @name JSON.parse(this)
   */
  String.prototype.toJson = function () {
    try {
      return eval('(' + this + ')');
    } catch (e) { // e.name、e.message
      console.log("%cERR: 字符串『" + this + "』不是json格式\n", "color:red");
      console.log(e);
      return {};
    }
  };
  /** 根据url得到文件内容 
   * @param fun - 得到文件后的执行操作
   */
  String.prototype.urlTxt = function (fun) {
    kook.ajax.init({
      url: this
    }, function (xmlHttp) {
      if (xmlHttp.readyState == 4) {
        fun(xmlHttp.responseText);
      }
    });
  };
  /** 读取JSON文件 
   * @param Function fun - 加载完成后的执行函数
   * @return {JSON}
   */
  String.prototype.urlJson = function (fun) {
    this.urlTxt(function (txt) {
      fun(txt.toJson());
    });
  };
  /** 正则表达式变换首字母大写 
   * my.replaceReg
   * @return {String}
   */
  String.prototype.firstUpper = function () {
    var reg = /\b(\w)|\s(\w)/g,
      v = this.toLowerCase();
    return v.replace(reg, function (v) {
      return v.toUpperCase()
    });
  };
  /**
   * 得到截取切割后的数据集合 
   * my.split
   * @param String start - 开始的切割字符串
   * @param String end - 截至的字符串
   * @return {Array}
   */
  String.prototype.sliceSplit = function (start, end) {
    var str = this.split(start);
    for (var i = 1, arr = []; i < str.length; i++) arr.push(str[i].split(end)[0]);
    return arr;
  };
  /** 替换所有 
   * my.replace
   * @param String sub - 需要替换的
   * @param String rep - 替换后的
   * @return {String}
   */
  String.prototype.replaceG = function (sub, rep) {
    return this.replace(new RegExp(sub, "g"), rep);
  };
  /** 设置Cookie的值 
   * @param String name - 键
   * @param Integer data - 生命周期，取值：
   * ①：配置数字表示天数，默认值为30（天）
   * ②：true配置值（或者非数字值）配置永久
   * document.cookie = "cm_bg = " + this.dataset.v; - 未设置生命周期，则其生命周期在浏览器窗口关闭时结束
   */
  String.prototype.setCookie = function (name, data) {
    if (!data) data = 30;
    var d = new Date(),
      exp_d;
    if (data.isNum()) {
      d.setTime(d.getTime() + data * 24 * 60 * 60 * 1000);
      exp_d = d.toGMTString();
    } else {
      exp_d = d.MaxValue; // 永不过期
    }
    document.cookie = name + "=" + escape(this) + ";expires=" + exp_d;
  };
  /** 得到客户端中键为this的Cookie中的值 
   * @return {String}
   */
  String.prototype.getCookie = function () {
    var arr, reg = new RegExp("(^| )" + this + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    return null;
  };
  /** 删除Cookie中名为this的值 
   */
  String.prototype.deleCookie = function () {
    //获取当前时间
    var d = new Date();
    d.setTime(d.getTime() - 10000); //将date设置为过去的时间
    document.cookie = this + "=;expires=" + d.toGMTString();
  };
})(window);
