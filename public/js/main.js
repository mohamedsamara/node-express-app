$(document).ready(function() {});

var validateFormData = function() {
  var isFormValid = true;

  $('.form-control').each(function() {
    if ($(this).val() === '') {
      isFormValid = false;
      $(this).addClass('error-input');
    }

    $(this).blur(function() {
      if ($(this).val() === '') {
        $(this).addClass('error-input');
      } else {
        $(this).removeClass('error-input');
      }
    });
  });

  return isFormValid;
};

// validate add form
function validateForm() {
  if (validateFormData()) {
    console.log('valid!');
  } else { 
    alert('Some data are required!!');
    return false;
  }
}
