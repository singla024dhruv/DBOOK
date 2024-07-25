// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            console.log($(self).attr('href'));
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),//if you want to get the href attribute of an anchor (<a>) element, you should use .attr('href').
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    $(self).attr("data-likes", likesCount); //etting the value of the data-likes attribute of the HTML element referred to by self to the value of the likesCount variable.
                    $(self).html(
                      `<i class="fa-regular fa-heart"></i> ${likesCount}`
                    );
                    
                }else{
                    likesCount += 1;
                    $(self).attr("data-likes", likesCount); //etting the value of the data-likes attribute of the HTML element referred to by self to the value of the likesCount variable.
                    $(self).html(
                      `<i class="fa-solid fa-heart"></i> ${likesCount}`
                    );
                }

                
                // window.location.href = '/';

//n the line $(self).html(${likesCount} Likes);, the backticks are used to create a template literal that incorporates the likesCount variable within the string. This way, you can dynamically include the value of likesCount in the string and display it as part of the HTML conten
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
