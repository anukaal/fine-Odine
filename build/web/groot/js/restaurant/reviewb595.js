$(".submit-review").on("click",function(){var e=$("#form-review").serialize(),s=$(this);return s.addClass("hidden"),s.siblings(".loader-small").removeClass("hidden"),$.ajax("/review",{type:"POST",data:e,success:function(e){onSuccess(e),$("#form-review")[0].reset(),s.siblings(".loader-small").addClass("hidden"),s.removeClass("hidden")},error:function(e){s.siblings(".loader-small").addClass("hidden"),s.removeClass("hidden"),onError(e)},cache:!1}),!1});