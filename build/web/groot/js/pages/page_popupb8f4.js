$(document).ready(function(){$("body").on("click",".form_submit_button",function(e){e.preventDefault(),$(this).addClass("click");var t=$(this).data("form");return void 0===t?$(this).closest("form").submit():$("#"+t).submit(),!1}),$(document).on("click",".accordion",function(){$(this).find("span").toggleClass("icon-down-arrow").toggleClass("icon-up-arrow"),$(document).find("div.accordion-o").toggleClass("hidden")});var e=$("#page_type").val();if("mmt"===e){var t=$("#mmt_code").attr("value");""!==t&&($("#mmt-popup").addClass("active"),$("body").css("overflow","hidden"),$(document).on("submit",".form",function(e){e.preventDefault();var r=$(this).data("method"),a=$(this).data("action"),s=$(this).serialize(),o=$(this);o.find("button").text(),o.find("button");return $.ajax({url:a,type:r,data:s,success:function(e){$("a#action_url").each(function(){var t=$(this).attr("href"),r=t+"?mcd="+e;$(this).attr("href",r)}),$("#mmt-popup").removeClass("active"),$("body").css("overflow","auto")},error:function(e){if(422===e.status){$("#mmt-code").attr("value",t);var r=$.parseJSON(e.responseText).errors;o.find("div.error-message").text(r.mmt_code)}}}),!1}))}else if("jet"==e){if(0===$("#jet-popup").length)return!1;$("#jet-popup").removeClass("hidden"),$("#jet-card-form").submit(function(t){t.preventDefault();var r=$("#jet-card-form");r.find(".error-message").text("");var a=r.data("method"),s=r.data("action"),o=new FormData(r[0]),i=o.get("coupon_code");return"jet"===e&&(null==i.match(/^\d+$/g)?(r.find(".error-message").text("Membership Number should contain numeric digits (0-9).").removeClass("green").addClass("red"),!1):void $.ajax({url:s,type:a,data:o,cache:!1,contentType:!1,processData:!1,success:function(e){$("#jet-code").attr("disabled",!0),$("#jet-code-submit").remove(),$(".jetprivilege-startbooking").removeClass("hidden")},error:function(e){401===e.status?r.find("div.error-message").text("Please login to enter the Jet Privilege Membership Number.").removeClass("green").addClass("red"):422===e.status?r.find("div.error-message").text(e.responseJSON).removeClass("green").addClass("red"):r.find("div.error-message").text("Jet Privilege Membership Number is invalid. Please enter a valid Jet Privilege Membership Number").removeClass("green").addClass("red")}}))})}});