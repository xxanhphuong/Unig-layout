$(window).scroll(function () {
    var sticky = $('header'),
        scroll = $(window).scrollTop();

    if (scroll >= 40) {
        sticky.addClass('fixed-header');
    }
    else {
        sticky.removeClass('fixed-header');

    }
});

$(document).ready(function () {
    $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        var id = id_selector.substr(id_selector.length - 1);
        id = parseInt(id);
        $('.carousel-indicators-custom li button').removeClass('active-btn');
        $(this).addClass('active-btn');
        $('#carouselExampleIndicators').carousel(id - 1);
    });

    $('.line-step').height($('.carousel-indicators-custom').innerHeight());

    $('.slider-evaluate').slick({
        centerMode: true,
        lazyLoad: 'ondemand',
        speed: 1000,
        centerPadding: '60px',
        slidesToShow: 3,
        variableWidth: true,
        infinite: true,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    centerMode: true,
                    dots: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    dots: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-staff').slick({
        centerMode: true,
        lazyLoad: 'ondemand',
        speed: 1000,
        arrows: false,
        centerPadding: '60px',
        slidesToShow: 3,
        variableWidth: true,
        infinite: true,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    centerMode: true,
                    dots: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    dots: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
});

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").style.display = "none";
    } else {
        document.getElementById("nextBtn").innerHTML = "Tiếp tục";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        // ... the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true; valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    c = x[currentTab].querySelectorAll("input[type=checkbox]:checked");
    message = document.getElementById("alert-message");
    selectCity = document.getElementById("select-city");
    optionCity = selectCity.children[selectCity.options.selectedIndex];
    selectDistrict = document.getElementById("select-district");
    optionDistrict = selectDistrict.children[selectDistrict.options.selectedIndex];

    if (optionCity.value == "" || optionDistrict.value == "") {
        valid = false;
        message.style.display = 'block';
    }
    else
        message.style.display = 'none';
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "" && c.length == 0) {
            // add an "invalid" class to the field:
            // y[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
            message.style.display = 'block';
        }
        else {
            message.style.display = 'none';
            valid = true;
        }

    }

    // If the valid status is true, mark the step as finished and valid:
    if (valid === true) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}