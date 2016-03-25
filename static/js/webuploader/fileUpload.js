/*!
 * by tommyshao
 * 基于 baidu webuploader 图片编辑
 * 2016-03-22
 * require:
 * 		jQuery 1.10+
 * 		webuploader
 */

;(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('ui/fileUpload', ['jquery', 'webuploader'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('webuploader'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {


    'use strict';

	var
	// 所有文件的进度信息，key为file id
    percentages = {},
    // 判断浏览器是否支持图片的base64
    isSupportBase64 = ( function() {
        var data = new Image();
        var support = true;
        data.onload = data.onerror = function() {
            if( this.width != 1 || this.height != 1 ) {
                support = false;
            }
        }
        data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        return support;
    } )(),

    // 检测是否已经安装flash，检测flash的版本
    flashVersion = ( function() {
        var version;

        try {
            version = navigator.plugins[ 'Shockwave Flash' ];
            version = version.description;
        } catch ( ex ) {
            try {
                version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                        .GetVariable('$version');
            } catch ( ex2 ) {
                version = '0.0';
            }
        }
        version = version.match( /\d+/g );
        return parseFloat( version[ 0 ] + '.' + version[ 1 ], 10 );
    } )(),

    supportTransition = (function(){
        var s = document.createElement('p').style,
            r = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;
        s = null;
        return r;
    })();

	/**
	 * Uploader
	 * @param  {string} el  the element of upload's button
	 * @param  {object} options initiliaze configure
	 * @return
	 */
	var Uploader = function(el, options) {
		this.$el = $(el);
		this.options = $.extend({}, Uploader.DEFAULTS, options);
		this.uploader = null;

		this.init();
	};

	// defaults configure
	Uploader.DEFAULTS = {
		tpl: '<div class="img-editor">'+
             '   <div class="queueList"></div>'+
             '   <div class="statusBar">'+
   			 '       <div class="info"></div>'+
             '       <div class="btns">'+
             '           <div class="uploadBtn">开始上传</div>'+
             '       </div>'+
             '   </div>'+
             '</div>',
        auto: false,
        multiple: false, //是否多文件
        water: false, //是否加水印
        thumbnail: false, //是否生成缩略图
        sendurl: null, //发送地址
        fileVal: 'File', // 文件参数名
        filetypes: "jpg,jpeg,bmp,png,gif,pdf,doc,docx", //文件类型
        filesize: "204800", //文件大小
        btntext: "点击上传", //上传按钮的文字
        swf: null //SWF上传控件相对地址
        //fileNumLimit: 300,
        //fileSizeLimit: 200 * 1024 * 1024,    // 200 M
        //fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
        , thumbnailWidth: 400
        , thumbnailHeight: 400
        , success: $.noop
	};

	// method of Instance
	Uploader.prototype = {
		constructor: Uploader,
		init: function() {

			// 检测浏览器是否支持上传控件
	        if ( !WebUploader.Uploader.support('flash') && WebUploader.browser.ie ) {
	        	var swfUrl = this.options.swf;
	            // flash 安装了但是版本过低。
	            if (flashVersion) {
	                (function(container) {
	                    window['expressinstallcallback'] = function( state ) {
	                        switch(state) {
	                            case 'Download.Cancelled':
	                                alert('您取消了更新！')
	                                break;

	                            case 'Download.Failed':
	                                alert('安装失败')
	                                break;

	                            default:
	                                alert('安装已成功，请刷新！');
	                                break;
	                        }
	                        delete window['expressinstallcallback'];
	                    };

	                    var path = swfUrl.split('/');
	                    var rootPath = path.slice(0, path.length - 1).join('/');
	                    var swf = rootPath+ '/expressInstall.swf';
	                    // insert flash object
	                    var html = '<object type="application/' +
	                            'x-shockwave-flash" data="' +  swf + '" ';

	                    if (WebUploader.browser.ie) {
	                        html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
	                    }

	                    html += 'width="100%" height="100%" style="outline:0">'  +
	                        '<param name="movie" value="' + swf + '" />' +
	                        '<param name="wmode" value="transparent" />' +
	                        '<param name="allowscriptaccess" value="always" />' +
	                    '</object>';

	                    container.html(html);

	                })(this.$el.parent());

	            // 压根就没有安转。
	            } else {
	                this.$el.parent().html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
	            }

	            return;
	        } else if (!WebUploader.Uploader.support()) {
	            alert( '很抱歉您的浏览器不支持上传控件！');
	            return;
	        }


	        // 初始化
	        this.$editor = $(this.options.tpl);
			this.$el.after(this.$editor);
			this.$uploadBtn = this.$editor.find('.uploadBtn');
			this.$queueContainer = this.$editor.find('.queueList');
			this.$info = this.$editor.find('.info');
			this.$container = null;
			this.$queue = $( '<ul class="filelist"></ul>' ).appendTo( this.$queueContainer );
			this.rotation = 0;
			this.uploading = false;
            this.$toolbar = null;
			this.__initUploader();
		},
		__initUploader: function() {
			var opt = this.options;
			var sendUrl = this.options.sendurl;
			sendUrl +='?action=UploadFile';
			if(opt.water) {
				sendUrl += '&IsWater=1'
			}
			if(opt.thumbnail) {
				sendUrl += '&IsThumbnail=1';
			}
			if(opt.multiple) {
				sendUrl +='&DelFilePath='+ this.$el.siblings('.upload-path').val();
			}

			this.uploader = WebUploader.create({
				auto: opt.auto,
				swf: opt.swf,
				server: sendUrl,
				pick: {
					id: this.$el[0],
					multiple: opt.multiple
				},
				accept: {
					extensions: opt.filetypes
				},
				formData: {
					'DelFilePath': ''
				},
				fileVal: opt.fileVal,
				fileSingleSizeLimit: opt.filesize * 1024 //文件大小
                ,compress: { // 启用图片压缩
                    //width: 1600,
                   // height: 1600,
                     quality: 75
                    //comporessSize: p.filesize * 1024
                }
			});

			this.__listenUploader();
		},
		__listenUploader: function(){
			var self = this,
				p = this.options,
				parentObj = this.$el,
				uploader = this.uploader;

			//当validate不通过时，会以派送错误事件的形式通知
            uploader.on('error', function (type) {
                switch (type) {
                    case 'Q_EXCEED_NUM_LIMIT':
                        alert("错误：上传文件数量过多！");
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':
                        alert("错误：文件总大小超出限制！");
                        break;
                    case 'F_EXCEED_SIZE':
                        alert("错误：文件大小超出限制！");
                        break;
                    case 'Q_TYPE_DENIED':
                        alert("错误：禁止上传该类型文件！");
                        break;
                    case 'F_DUPLICATE':
                        alert("错误：请勿重复上传该文件！");
                        break;
                    default:
                        alert('错误代码：' + type);
                        break;
                }
            });

            //当有文件添加进来的时候
            uploader.on('fileQueued', function (file) {
                //如果是单文件上传，把旧的文件地址传过去
                if (!p.multiple) {
                    uploader.options.formData.DelFilePath = parentObj.siblings(".upload-path").val();
                }

                self.__addFile(file);

            });

            // 文件上传前
            uploader.on('uploadBeforeSend', function(file, data){
            	data.rotation = self.rotation;
            });

            //文件上传过程中创建进度条实时显示
            uploader.on('uploadProgress', function (file, percentage) {
                var $percent = self.$progress.find('span');
	            $percent.css( 'width', percentage * 100 + '%' );
	            self.$info.find('.wu-percent-text').html(',已上传'+ percentage * 100 + '%');
            });

            //当文件上传出错时触发
            uploader.on('uploadError', function (file, reason) {
                uploader.removeFile(file); //从队列中移除
                alert(file.name + "上传失败，错误代码：" + reason);
                self.$container.off().remove();
                self.$editor.hide();
            });

            //当文件上传成功时触发
            uploader.on('uploadSuccess', function (file, data) {
                self.$container.append( '<span class="success"></span>' );

                uploader.removeFile(file); //从队列中移除

                function success() {
                	// callbck method
                	p.success(parentObj, file, data);

                	self.$editor.hide();
                	self.$container.off().remove();
                	self.$info.html('');
                }


                setTimeout(success, 500);
            });

            //不管成功或者失败，文件上传完成时触发
            uploader.on('uploadComplete', function (file) {
            	self.$uploadBtn.removeClass('disabled');
                self.$progress.hide();
                self.$toolbar.show();
            	self.uploading = false;
            });

		},
		__addFile: function(file){
			var self = this,
				$queue= this.$queue,
				opt = this.options,
				uploader = this.uploader;

			this.$editor.show();

			var $li = $( '<li id="' + file.id + '">' +
                    //'<p class="title">' + file.name + '</p>' +
                    '<p class="imgWrap"></p>'+
                    '<p class="progress"><span></span></p>' +
                    '</li>' ),

                $btns = $('<div class="file-panel">' +
                    '<span class="cancel">删除</span>' +
                    '<span class="rotateRight">向右旋转</span>' +
                    '<span class="rotateLeft">向左旋转</span></div>').appendTo( $li ),
               //,
                $wrap = $li.find( 'p.imgWrap' ),
                $info = $('<p class="error"></p>'),
                $img = null,
                showError = function( code ) {
                    switch( code ) {
                        case 'exceed_size':
                            text = '文件大小超出';
                            break;

                        case 'interrupt':
                            text = '上传暂停';
                            break;

                        default:
                            text = '上传失败，请重试';
                            break;
                    }

                    $info.text( text ).appendTo( $li );
                },
                removeFile = function(){
                	$li.off().remove();
                	self.$editor.hide();
                };

            this.$progress = $li.find('p.progress');

            if ( file.getStatus() === 'invalid' ) {
                showError( file.statusText );
            } else {
                // @todo lazyload
                $wrap.text( '预览中' );

                uploader.makeThumb( file, function( error, src ) {
                	//console.log(file._info)
                    //var img;

                    if ( error ) {
                        $wrap.text( '不能预览' );
                        return;
                    }

                    if( isSupportBase64 ) {
                        $img = $('<img src="'+src+'">');
                        $wrap.empty().append( $img );
                    }
                }, opt.thumbnailWidth, opt.thumbnailHeight );

                percentages[ file.id ] = [ file.size, 0 ];
                file.rotation = 0;
            }

            // 工具按钮
            $btns.on( 'click', 'span', function() {
                var index = $(this).index(),
                    deg;

                switch ( index ) {
                    case 0:
                        uploader.removeFile( file );
                        removeFile();
                        return;

                    case 1:
                        file.rotation += 90;
                        break;

                    case 2:
                        file.rotation -= 90;
                        break;
                }

                if ( supportTransition ) {
                    deg = 'rotate(' + file.rotation + 'deg)';
                    //$wrap.css({
                    $img.css({
                        '-webkit-transform': deg,
                        '-mos-transform': deg,
                        '-o-transform': deg,
                        'transform': deg
                    });
                } else {
                    $img.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
                }

                self.rotation = file.rotation;


            });


            // 添加到列表
	        $li.appendTo( $queue );

	        this.$container = $li;
            this.$toolbar = $btns;

	        this.$info.html(WebUploader.formatSize( percentages[file.id][0] )+'<span class="wu-percent-text"></span>');

	        // --------
            //  开始上传
            this.$uploadBtn.on('click', function() {
            	if(self.uploading) return;
            	self.uploading = true;
            	self.$progress.show();
            	$btns.hide();
	            uploader.upload();

	            $(this).addClass('disabled');
	        });

		}
	}


	// jquery bridge
	function Plugin(options) {
		// method call argument
		var args = [].slice.call(arguments, 1);
		// return jquery object
		return $(this).each(function() {
			var that = $(this),
				data = that.data('ui.fileUpload');

			// Initliaze the Object
			if(!data) {
				data = new Uploader(that, options);
				// store the instance
				that.data('ui.fileUpload', data);
			}

			// use the method
			if(typeof options === 'string') {
				data[options] && data[options](args);
			}
		});
	}

	// common api
	$.fn.fileUpload = Plugin;

	return Uploader;

}));
