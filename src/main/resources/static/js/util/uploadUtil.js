/**
 * creator: xiaohui zheng
 * time: 2017/10/29  20:48
 * function: 绑定dropzone被template生成后的元素代码
 */
function bindEl(itemUid) {
    var $itemEL = $("#" + itemUid);
    $itemEL.dropzone({
        url: "/UploadFile/displayUploadInform",
        autoProcessQueue: false,
        addRemoveLinks: false,
        maxFiles: 1,
        maxFilesize: 10,
        acceptedFiles: '*',
        init: function () {
            var element = this;
            console.log(element);
            this.on('addedfile', function () {
                var existed = this.getAcceptedFiles();
                while (existed.length >= 1) {
                    this.removeFile(existed[0]);
                    existed.splice(0, 1);
                }
            });
            this.on('sending', function () {
            });
            this.on('success', function (file, response) {
                if (response.code === 200) {
                    $itemEL.attr('data-serv-url', response.data);
                    return;
                }
                $itemEL.attr('data-serv-url', '');
            });
            this.on("maxfilesexceeded", function () {
                this.removeFile(this.getAcceptedFiles());
            });
        },
        dictDefaultMessage: '点击/拖拽添加图片',
        dictInvalidInputType: '文件类型不支持',
        dictMaxFilesExceeded: '超过最大文件数量',
        dictFileTooBig: '图片文件不予许超过10M'
    });
}

bindEl('my-dropzone');