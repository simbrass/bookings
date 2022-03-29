/*!
* Start Bootstrap - Stylish Portfolio v6.0.5 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/

let attention = Prompt()

// Functions related to the theme
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

// Function related to the theme
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

// Functions related to the theme
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// Bootstrap form enhanced
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

console.log("Printing javascript...");



function test() {
    let button = document.getElementById("check-availability-button")
    if (!button) {
        console.log("bouton absent")
    } else {
        console.log("bouton présent")
    }
} test()

function checkAvailabilityButton() {
    let button = document.getElementById("check-availability-button")
    if (button) {
        button.addEventListener("click", function(){ 
            html = `     
                <form id="check-availability-form" action="" method="post" class="needs-validation" novalidate>
                    <div class="form-row">
                        <div id="reservation-dates-modal" class="form-row">
                            <div class="col">
                                <input disabled required autocomplete="off" type="text" class="swal2-input" id="start-modal" name="start-modal" placeholder="Arrival">
                            </div>
                            <div class="col">
                                <input disabled required autocomplete="off" type="text" class="swal2-input" id="end-modal" name="end-modal" placeholder="Departure">
                            </div>
                        </div>
                    </div>
                </form>
            `
            
            attention.custom({
                title: "Choose your dates", 
                msg: html, 
        
                willOpen: () => {
                    const elem = document.getElementById('reservation-dates-modal');
                    const rangepicker = new DateRangePicker(elem, {
                      format: "yyyy-mm-dd",
                    }); 
                },
        
                didOpen: () => {
                    document.getElementById("start-modal").removeAttribute("disabled");
                    document.getElementById("end-modal").removeAttribute("disabled");
                },
        
                callback: function(result) {
                    console.log("called")
        
                    let form = document.getElementById("check-availability-form")
                    let formData = new FormData(form)
                    let tkn = document.querySelector("meta[name='csrf-token']").content
                    formData.append("csrf_token", tkn)
        
                    fetch("/search-availability-json", {
                        method: "post",
                        body: formData,
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            console.log(data.ok)
                            console.log(data.message)
                        })
                }
            })
        })
    }
} checkAvailabilityButton()

// document.getElementById("check-availability-button").addEventListener("click", function(){ 
//     html = `     
//         <form id="check-availability-form" action="" method="post" class="needs-validation" novalidate>
//             <div class="form-row">
//                 <div id="reservation-dates-modal" class="form-row">
//                     <div class="col">
//                         <input disabled required autocomplete="off" type="text" class="swal2-input" id="start-modal" name="start-modal" placeholder="Arrival">
//                     </div>
//                     <div class="col">
//                         <input disabled required autocomplete="off" type="text" class="swal2-input" id="end-modal" name="end-modal" placeholder="Departure">
//                     </div>
//                 </div>
//             </div>
//         </form>
//     `
    
//     attention.custom({
//         title: "Choose your dates", 
//         msg: html, 

//         willOpen: () => {
//             const elem = document.getElementById('reservation-dates-modal');
//             const rangepicker = new DateRangePicker(elem, {
//               format: "yyyy-mm-dd",
//             }); 
//         },

//         didOpen: () => {
//             document.getElementById("start-modal").removeAttribute("disabled");
//             document.getElementById("end-modal").removeAttribute("disabled");
//         },

//         callback: function(result) {
//             console.log("called")

//             let form = document.getElementById("check-availability-form")
//             let formData = new FormData(form)
//             let tkn = document.querySelector("meta[name='csrf-token']").content
//             formData.append("csrf_token", tkn)

//             fetch("/search-availability-json", {
//                 method: "post",
//                 body: formData,
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     console.log(data)
//                     console.log(data.ok)
//                     console.log(data.message)
//                 })
//         }
//     })
// })



function notify(msgType, msgText) {
    notie.alert({
        type: msgType, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
        text: msgText,
    })
}


function notifyModal(title, text, icon, confirmButtonText) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText
    })
}



function Prompt() {
    let toast = function(c) {
        const {
            msg = "",
            icon = "success",
            position = "top-end",

        } = c;
        const Toast = Swal.mixin({
            toast: true,
            title: msg,
            position: position,
            icon: icon,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({})
    }

    let success = function(c) {
        const {
            icon = "success",
            title = "",
            msg = "",
            footer = "",
        } = c;
        Swal.fire({
            icon: icon,
            title: title,
            text: msg,
            footer: footer
        })
    }

    let error = function(c) {
        const {
            icon = "error",
            title = "",
            msg = "",
            footer = "",
        } = c;
        Swal.fire({
            icon: icon,
            title: title,
            text: msg,
            footer: footer
        })
    }

    let custom = async function(c) {
        const {
            title = "",
            msg = "",
        } = c;

        const { value: result } = await Swal.fire({
            title: title,
            html: msg,
            focusConfirm: false,
            showCancelButton: true,
            willOpen: () => {
                if (c.willOpen !== undefined) {
                    c.willOpen()
                }
            },
            preConfirm: () => {
              return [
                document.getElementById('start-modal').value,
                document.getElementById('end-modal').value
              ]
            },
            didOpen: () => {
                if (c.didOpen !== undefined) {
                    c.didOpen()
                }
            }
        })
          
        if (result) {
            if (result.dismiss !== Swal.DismissReason.cancel) {
                if (result.value !== "") {
                    if (c.callback !== undefined) {
                        c.callback(result)
                    } else {
                        c.callback(false)
                    }
                }
            } else {
                c.callback(false)
            }
          }
    }

    return {
        toast: toast,
        success: success,
        error: error,
        custom: custom,
    }
}

