function loadSlots(){if($("#booking-container").addClass("hidden"),$("#slots-loader").removeClass("hidden"),$("#coupon-container").addClass("hidden"),getMMTCode())var e=$("#form-search-slots").serialize()+"&mcd="+getMMTCode();else var e=$("#form-search-slots").serialize();var a=$('#form-search-slots input[name="date"]').val(),t=$('#form-search-slots select[name="time"]').val(),s=$('#form-search-slots select[name="pax"]').val();$("#form-booking input[name=date]").val(a),$("#form-booking input[name=pax]").val(s),$.ajax("/search/slots",{type:"GET",data:e,success:function(e){var n=jQuery.parseJSON(e);$(".slots").html(""),$(".deals").html(""),$("#slot-pick-message").removeClass("hidden"),$("#deals-container").addClass("hidden"),deals=[],$(".sub-slot-header").data("count_a",0),$(".sub-slot-header").data("count_w",0),$(".slot-type").addClass("hidden");var i=0,l=0;if($.each(n,function(e,a){if(null!==a){deals[e]=a.deals;var s=!0===a.inventory?"available":"wait",n=!0===a.inventory?"A":"W",d=a.type;"midnight"===d?d="#slot-midnight":"breakfast"===d?d="#slot-breakfast":"lunch"===d?d="#slot-lunch":"high tea"===d?d="#slot-high-tea":"dinner"===d&&(d="#slot-dinner"),$(d).removeClass("hidden"),"available"===s?(i=$(d+" .sub-slot-header").data("count_a"),i+=1,$(d+" .sub-slot-header").data("count_a",i)):(l=$(d+" .sub-slot-header").data("count_w"),l+=1,$(d+" .sub-slot-header").data("count_w",l));var o=!0===a.inventory?"Available":"Waitlist",r=$(d+" .slots").append('<label class="w-3-12"><input type="radio" class="hidden" name="time" value="'+a.time+'" /><div class="slot small relative height-37 width-90 '+s+'" data-key="'+e+'" data-status="'+n+'"><span class="font-11 slot-status margin-b-5">'+o+"<br></span>"+a.time+"</div></label>");if($(d+" .sub-slot-header").data("count_a")>0)var c=$(d+" .sub-slot-header").data("count_a")+" Available";else var c="";if($(d+" .sub-slot-header").data("count_w")>0&&$(d+" .sub-slot-header").data("count_a")>0)var p=", "+$(d+" .sub-slot-header").data("count_w")+" Waitlisted";else if($(d+" .sub-slot-header").data("count_w")>0)var p=$(d+" .sub-slot-header").data("count_w")+" Waitlisted";else var p="";$(d+" .slot-count").text(c+p+" slots"),t==a.time&&(r.find("input").prop("checked",!0),r.find(".slot").trigger("click"),$(".sub-slot-header").removeClass("open"),r.parents(".slot-type").children(".sub-slot-header").addClass("open"));try{var u=a.deals[0].coupon;if(u){var h='<div class="margin-t-10"><div class="grid eazy-outline"><div class="w-4-12 bold eazy-1000">Earn '+u.points+' <span class="black">EazyPoints</span></div><div class="w-8-12 bold small eazy-label">Apply '+u.code+" coupon code and Earn"+u.points+" EazyPoints.</div></div></div>";$("#coupon-container").html(h)}}catch(e){}$("#coupon-container").removeClass("hidden")}}),$("#no-slots").addClass("hidden"),$("#select-deals-container").removeClass("hidden"),$.isEmptyObject(n)&&($("#no-slots").removeClass("hidden"),$("#select-deals-container").addClass("hidden")),$(".search-slots-placeholder").html(s+" Guests | "+a+" | "+t),$("#booking-container").removeClass("hidden"),$("#slots-loader").addClass("hidden"),!$(".sub-slot-header").hasClass("open")){var d=$(".sub-slot-header"),o=0;$.each(d,function(e,a){$(a).data("count_a")>o&&($(".sub-slot-header").removeClass("open"),o=$(a).data("count_a"),$(a).addClass("open"),$(a).parent().find(".slots").first().trigger("click"))})}},error:onError})}function checkSelectedDeal(){if($(".selected-deal").addClass("hidden"),$(".deal").css("background-color","#fff"),$("#form-booking input[name=deal]").is(":checked")){var e=$("#form-booking input[name=deal]:checked").parents(".deal");$(e).css("background-color","#fafafa"),$(e).find(".selected-deal").removeClass("hidden")}}function getMMTCode(){var e=window.location.href;if(-1!==e.indexOf("mcd")){var a=e.split("="),t=parseInt(a.length)-1,s=a[t];return s.length>0&&s}return!1}function getMessage(){var e="",a=$(".selected-deal:not(.hidden)"),t=$("form#form-booking").find('input:hidden[name="pax"]').val(),s=a.find('input:hidden[id="pax_pair"]').val(),n=a.find('input:hidden[id="pax_operator"]').val(),i=a.find('input:hidden[id="pax_value"]').val();if(void 0!==t&&void 0!==s&&t%s!=0){for(var l=parseInt(t);l%s!=0;)l=parseInt(l)+1;e=e+"<li>This deal is applicable for group of "+s+" pax. Please select minimum "+s+" pax.</li>"}if(void 0!==n&&void 0!==i&&null!=n&&null!=i)switch(n){case">":t<=i&&(e=e+"<li>Deal is applicable for minimum "+(parseInt(i)+1)+" pax. Increase the no. of pax to continue.</li>");break;case">=":t<i&&(e=e+"<li>Deal is applicable for minimum "+i+" pax and above. Please select atleast "+i+" pax.</li>");break;case"<":t>=i&&(e=e+"<li>Deal is applicable for maximum "+(parseInt(i)-1)+" pax. Reduce the no. of pax to less than "+i+" to continue.");break;case"<=":t>i&&(e=e+"<li>Deal is applicable for maximum "+i+" pax. Decrease the no. of pax to continue.</li>");break;case"!=":t==i&&(e=e+"<li>This deal is not applicable for "+i+" pax. Please select any pax other than "+i+".</li>");break;case"==":t!=i&&(e=e+"<li>Deal is applicable for "+i+" pax only. Please select "+i+" pax to continue.</li>")}return e}var deals=[];$("#form-search-slots select").on("change",function(){loadSlots()}),$("#form-search-slots select[name=time]").trigger("change"),$(".slots").on("click",".slot",function(){$("#slot-pick-message").addClass("hidden"),$("#deals-container").removeClass("hidden");var e=$(this).data("key"),a="A"==$(this).data("status")?"available":"waitlist";$("input[name='slot_status']").val(a);var t=deals[e].length;$(".deals").html(""),$.each(deals[e],function(e,a){var s=$(".templates > .deal").clone();if(null!==a.allowed_pax&&void 0!==a.allowed_pax){var n=JSON.parse(a.allowed_pax);s.find(".selected-deal").append('<input type="hidden" id="pax_operator" value="'+n.operator+'">'),s.find(".selected-deal").append('<input type="hidden" id="pax_value" value="'+n.value+'">')}null!==a.bookable_pax_group&&void 0!==a.bookable_pax_group&&s.find(".selected-deal").append('<input type="hidden" id="pax_pair" value="'+a.bookable_pax_group+'">');var i="";if(1==a.prepaid)if(i="<li>PayTM cashback is not applicable on this deal.</li>","mmt"==a.subtype){s.find(".type").html("MMT Privilege Deal");var l=IMAGE_URL+"eazymedia/deals/menu/"+a.menu;s.find(".menu a").attr("href",l),s.find(".menu").removeClass("hidden")}else{if(s.find(".type").html("EazySave Deal"),"mojito"!=a.subtype){var d=IMAGE_URL+"eazymedia/deals/menu/"+a.menu;s.find(".menu a").attr("href",d),s.find(".menu").removeClass("hidden")}else s.find(".menu").addClass("hidden");null!=a.actual_price&&0!=a.actual_price&&a.actual_price>a.price&&(s.find(".splash").removeClass("hidden"),s.find(".original-price").text(a.actual_price),s.find(".discounted-price").text(a.price))}else{if("alacarte"==a.type||"Alacarte"==a.type)var o="À la carte (From the menu)";else o=a.type;s.find(".type").html(o)}if("ipl deals"==a.subtype){s.find(".type").prepend("<img src='/images/ipltag.png' alt='ipl-tag' class='img padding-r-10' style='height: 25px;'>").addClass("v-center")}s.find(".tnc").attr("data-tnc",a.terms_and_conditions),s.find(".title").html(a.title),s.find('input[name="deal"]').val(a.id),s.find('input[name="deal"]').prop("checked",!0),t>1&&s.find(".radio .indicator").removeClass("visibility-hidden"),s.appendTo(".deals").append();var r=s.find(".tnc").data("tnc");s.find(".tnc .list-simple").append(i),r&&($.each(r,function(e,a){s.find(".tnc .list-simple").append("<li>"+a+"</li>")}),s.find(".tnc").removeAttr("data-tnc"))}),checkSelectedDeal()}),$(".deals").on("click",".tnc",function(){var e=$(this).data("tnc");$("#popup-deal-details ul>li.deal-specific").remove(),$.each(e,function(e,a){$("#popup-deal-details ul").append('<li class="deal-specific">'+a+"</li>")})}),$(".deals").on("click",'input[name="deal"]',function(){checkSelectedDeal()}),$("#form-booking").on("submit",function(){return!!$("#form-booking input[name=time]").is(":checked")||($(".slots").next(".error-msg").removeClass("hidden"),!1)}),$("#form-booking").on("change","input[name=time]",function(){$(".slots").next(".error-msg").addClass("hidden")}),$("#form-booking").on("change","input[name=deal]",function(){$(".deals").next(".error-msg").addClass("hidden")}),$(".sub-slot-header").on("click",function(){$(this).toggleClass("open"),$(".sub-slot-header").not(this).removeClass("open")});var maxdays=30,mindays=!0;shawmanMaxDays&&(maxdays=shawmanMaxDays),shawmanMinDays&&(mindays=shawmanMinDays),$(".datepicker.booking-date-detail").Zebra_DatePicker({direction:[mindays,maxdays],format:"d M, Y",show_clear_date:!1,readonly_element:!0,default_position:"below",show_icon:!1,onSelect:loadSlots,offset:[-1*$(".datepicker.booking-date-detail").parent().outerWidth(),$(".datepicker").outerHeight()]}),$(".book_button").click(function(e){if(e.preventDefault(),""!==getMessage()){var a=$("#pax_condition");a.find("ol.note").html(""),a.find("ol.note").append(getMessage()),a.removeClass("hidden").addClass("active")}else{var t=$(".qsr_deal").find("input:checked").parents(".new_deal").find(".q_coupon"),s=$(".qsr_deal").find("input:checked").parents(".new_deal").find(".q_coupon").text();if(0!=$(".qsr_deal").length){if($("input[name=coupons]").val()<=0)return showErrors(["Please select a deal."]),!1;if(void 0!==t&&parseInt(s)<=0)return showErrors(["Please select number of coupons."]),!1;!1!==$("#christmas_btn").hasClass("button")?($("#popup-tnc").addClass("active"),$("#christmas_btn").click(function(){$(".book_button").unbind("click").trigger("click")})):$(".book_button").unbind("click").trigger("click")}else $(".book_button").unbind("click").trigger("click")}});