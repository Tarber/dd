
///////start page animation////////////
$(document).ready(function() {
  $('#jain').on('keyup keypress', function(e){
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) { 
          e.preventDefault();
          return false;
        }
      });
  $('#ad').on('keyup keypress', function(e){
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) { 
          e.preventDefault();
          return false;
        }
      });
      $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if(target.length){
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1, function() {
            var $target = $(target);
            $target.focus();
            if($target.is(":focus")){
              return false;
            }
            else {
              $target.attr('tabindex','-1');
              $target.focus();
            };
          });
        }
      }
    });
})
setInterval(function(){
document.getElementById('margat').style.display="none";
}, 500);
setInterval(function(){
document.getElementById('margat').style.display="inline-block";
}, 1000);

