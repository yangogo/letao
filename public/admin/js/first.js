$(function () {
    var page = 1;
    var pageSize = 5;
    render();
    //渲染函数
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                //模板与数据结合渲染 
                $('tbody').html(template("tmp", info));
                //分页功能
                $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    numberOfPages: 5,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render()
                    }
                });
            }
        })
    }

    //打开模态框按钮事件
    $(".add_modal").on('click', function () {
        $("#addModal").modal('show');
    })
    // 表单校验
    //使用表单校验插件
    $("#form").bootstrapValidator({

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },

                }
            }
        }

    });
    //表单校验完成
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        //发送数据
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $("#form").serialize(),
            success: function (info) {
                if (info.success) {
                    $("#addModal").modal('hide');
                    page = 1
                    render();


                    //表单重置
                    $("#form").data('bootstrapValidator').resetForm(true);
                }
            }
        })
    });
    //添加分类事件
    $('.btn_add').on('click', function () {
        //重置表单


    })
})