/**
 * - 添加 
 * @author kook <m@214.xin>
 * @version 1.0
 * @datetime 2018-12-27 下午10:26:50
 */
;(function(window){
	var me = this,
	my = me.kook.add = {
	/** 元素绑定事件 
	 * @param Object obj - 元素
	 * @param String type - 事件名
	 * @param Function fun - 事件操作
	 */
		handler:function(obj, type, fun){
			if(obj.addEventListener){
				obj.addEventListener(type, fun, false);
			}else if(obj.attachEvent){
				obj.attachEvent('on'+type, fun);
			}else{
				obj["on"+type] = fun;
			}
		}
	};
})(window);
