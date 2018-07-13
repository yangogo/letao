$(function(){
   var page = 1;
   var pageSize = 5;
   render();
   //渲染函数
   function render(){
       $.ajax({
           type: "get",
           url:"/user/queryUser",
           data: {
               page : page,
               pageSize : pageSize
           },
           success : function (info){
               
                //模板与数据结合渲染 
                $('tbody').html( template( "tmp", info) );

                //分页功能
                $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, 
                    currentPage:info.page,
                     numberOfPages:5,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p){
                        page = p
                        render()
                    }            
                });
           }
       })
   }
   //btn 按钮点击事件
   $('tbody').on('click', "button", function(){
       var id = $(this).parent().data('id');
       var isDelete;
       if($(this).hasClass("btn-success")){
        isDelete = 1
       }else{
        isDelete = 0;
       }
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:id,
                isDelete:isDelete
            },
            success: function(info){
                if(info.success){

                    render()
                }
            }
            
        })   
    
   })
   
})