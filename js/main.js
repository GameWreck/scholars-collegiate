(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 10);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  var navbarButton = $("#navbar-button");
  var navbarHamburger = $("#navbar-hamburger");
  var navbarClose = $("#navbar-close");
  var shouldCloseNavbarOnScroll = true;
  var navbarCollapse = $(".navbar-collapse");

  navbarCollapse.on("show.bs.collapse", function () {
    navbarHamburger.addClass("d-none");
    navbarClose.removeClass("d-none");
  });

  navbarCollapse.on("hide.bs.collapse", function () {
    navbarHamburger.removeClass("d-none");
    navbarClose.addClass("d-none");
  });

  function closeNavbar() {
    if (navbarCollapse.hasClass("show")) {
      $(".navbar-toggler").click();
    }
  }

  $(".navbar-toggler").click(() => {
    shouldCloseNavbarOnScroll = true;
  });

  $(document).mouseup(function (event) {
    var navbar = $(".navbar");
    if (!navbar.is(event.target) && navbar.has(event.target).length === 0) {
      closeNavbar();
    }
  });

  $(window).scroll(function () {
    if (shouldCloseNavbarOnScroll) {
      closeNavbar();
    }
  });

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
      shouldCloseNavbarOnScroll = false;
    }
  });

  // Dropdown on mouse hover
  // const $dropdown = $(".dropdown");
  // const $dropdownToggle = $(".dropdown-toggle");
  // const $dropdownMenu = $(".dropdown-menu");
  // const showClass = "show";

  // $(window).on("load resize", function () {
  //     if (this.matchMedia("(min-width: 992px)").matches) {
  //       $dropdown.hover(
  //         function () {
  //           const $this = $(this);
  //           $this.addClass(showClass);
  //           $this.find($dropdownToggle).attr("aria-expanded", "true");
  //           $this.find($dropdownMenu).addClass(showClass);
  //         },
  //         function () {
  //           const $this = $(this);
  //           $this.removeClass(showClass);
  //           $this.find($dropdownToggle).attr("aria-expanded", "false");
  //           $this.find($dropdownMenu).removeClass(showClass);
  //         }
  //       );
  //     } else {
  //       $dropdown.off("mouseenter mouseleave");
  //     }
  //   });

  //    $(window).scroll(function () {
  //       if ($(this).scrollTop() > 300) {
  //            $('.back-to-top').fadeIn('slow');
  //       } else {
  //           $('.back-to-top').fadeOut('slow');
  //       }
  //    });
  //    $('.back-to-top').click(function () {
  //       $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
  //        return false;
  //   });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    nav: false,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    center: true,
    margin: 24,
    dots: true,
    loop: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

function adjustCategories() {
  const categoryContainer = document.getElementById('category-container');
  const categoryItems = categoryContainer.querySelectorAll('.category-item:not(#more-dropdown)');
  const moreDropdown = document.querySelector('#more-dropdown ul');

  // Define screen width breakpoints and corresponding max visible items
  const breakpoints = [767, 600, 500, 450, 400];
  const maxVisibleItems = [6, 5, 4, 3, 2, 1];

  let maxItems = 6;

  // Determine the maximum number of visible items based on screen width
  for (let i = 0; i < breakpoints.length; i++) {
    if (window.innerWidth <= breakpoints[i]) {
      maxItems = maxVisibleItems[i];
    }
  }

  // Show or hide the "More" dropdown based on the number of items in it
  if (categoryItems.length > maxItems) {
    document.getElementById('more-dropdown').style.display = 'inline-block';
  } else {
    document.getElementById('more-dropdown').style.display = 'none';
  }

  // Move items to the "More" dropdown as needed
  const itemsToMove = Array.from(categoryItems).slice(maxItems);
  moreDropdown.innerHTML = '';
  itemsToMove.forEach((item) => {
    const button = item.querySelector('button');
    const listItem = document.createElement('li');
    listItem.innerHTML = button.outerHTML;
    moreDropdown.appendChild(listItem);
    item.classList.add('fade-out');
    item.classList.remove('d-inline');
    item.style.display = 'none';
  });

  // Show all category items if the screen is wide enough
  if (window.innerWidth > 767) {
    categoryItems.forEach((item) => {
      item.classList.remove('fade-out');
      item.classList.add('d-inline');
      item.style.display = 'inline';
    });
  }
}

// Call the function initially and when the window resizes
adjustCategories();
window.addEventListener('resize', adjustCategories);


const gradeButtons = document.querySelectorAll('.grade-btn');

gradeButtons.forEach((button, index) => {
  button.addEventListener('click', () => {

    gradeButtons.forEach((btn) => {
      btn.classList.remove('active');
    });

    button.classList.add('active');
  });
});


$('.grade-btn').click((e) => {
  let btnID = e.target.id;
  $('.category-card').each(function () {
    if ($(this).find('.grade').data('grade') === btnID) {
      $(this).fadeIn(500, () => {
        $(this).parent().removeClass('d-none');
      });

    } else {
      $(this).fadeOut(500, () => {
        $(this).parent().addClass('d-none');
      });
    }
  });
});


$(".category-btn").click(function (e) {
  $('.category-btn').removeClass('active');
  $(this).addClass('active');
  $('.grade-btn').removeClass('active');

  let btnID = e.target.id;

  if (btnID !== "dropdownMenu") {
    $(".dropdown-menu .category-btn").removeClass("item-active");
    $('.category-card').each(function () {
      if (btnID === "all") {
        $(this).parent().removeClass('d-none');
        $(this).fadeIn(500);
      } else {
        if ($(this).find('.category').data('category') === btnID) {
          $(this).parent().removeClass('d-none');
          $(this).fadeIn(500);
        } else {
          $(this).fadeOut(500, () => {
            $(this).parent().addClass('d-none');
          });
        }
      }
    });
  }


});

$(".dropdown-menu .category-btn").click(function () {
  $(".dropdown-menu .category-btn").removeClass("item-active");
  $(this).addClass("item-active");
});

