{let e=function(){$(".add-friend-btn").click((function(e){e.preventDefault();$.ajax({type:"post",url:$(this).attr("href")}).done((function(e){let r=t(e.data.toUser);$("#user-friends>ul").prepend(r),n($(" .remove-friend",r)),new Noty({theme:"relax",text:"Friend Added!!!",type:"success",layout:"topRight",timeout:1500}).show()})).fail((function(e){console.log("error in completing the request")}))}))},t=function(e){return $(`<li id="friend-${e._id}">\n                    <img src="${e.avatar}" alt="${e.name}">\n\n                    <a href="/users/profile/${e._id}" class="user-friend-name">${e.name}</a>\n\n                    <a href="/friends/friendship/remove/${e._id}" class="remove-friend remove-add-btn">Remove</a>\n                </li>`)},n=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){console.log("freind request delete:: ",e),$(`#friend-${e.data.to_user}`).remove(),new Noty({theme:"relax",text:"Friend Deleted !!!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))},r=function(){$("#user-friends>ul>li").each((function(){let e=$(this),t=$(" .remove-friend",e);n(t)}))};e(),r()}
//# sourceMappingURL=friend_request.js.map
