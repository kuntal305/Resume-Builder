"use strict";

$(document).ready(function () {
  // ======================= ONLOAD EVENTS =======================
  $('#signup-btn, #login-btn').attr('disabled', 'disabled');
  $("#signup").click(function () {
    $(this).fadeOut();
    $(".land-login h3:first-child").slideUp("fast");
    $(".lead").slideUp("fast");
    $(".land-login-form").slideUp("fast");
    $(".land-login h3:nth-child(2)").slideDown("slow");
    $(".land-signup-form").slideDown("slow");
    $("#login").fadeIn();
    $('#signup-btn').attr('disabled', 'disabled');
  });
  $("#login").click(function () {
    $(this).fadeOut();
    $(".land-signup-form").slideUp("fast");
    $(".land-login h3:nth-child(2)").slideUp("fast");
    $(".land-login-form").slideDown("slow");
    $(".lead").slideDown("slow");
    $(".land-login h3:first-child").slideDown("slow");
    $("#signup").fadeIn();
  }); // ======================= VARIABLES/CONSTANTS =======================

  var emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  var nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/; // ======================= EVENTS =======================

  $('#signup-pwd').blur(function () {
    validatePass($(this).val());
  });
  $('#login-pwd').blur(function () {
    if (validatePass($(this).val())) {
      validateLoginForm();
    }
  });
  $('#login-email, #signup-email').blur(function () {
    validateEmail($(this).val());
  });
  $('#fname, #lname').blur(function () {
    validateName($(this).val());
  });
  $('#cpwd').blur(function () {
    if (checkPassword($('#signup-pwd').val(), $(this).val())) {
      validateSignUpForm();
    }
  }); // ======================= FUNCTIONS =======================

  function validateName(value) {
    if (!value) {
      alert("Please Enter Your First Name/Last Name");
    } else if (!nameRegex.test(value)) {
      alert("Please Enter Correct First Name/Last Name!!");
    }
  }

  function validateEmail(value) {
    if (!value) {
      alert('Please Enter an Email!');
    } else if (!emailRegex.test(value)) {
      alert("Please Enter Proper Email Address!!");
    }
  }

  function validatePass(value) {
    if (!value) {
      alert('Please Enter a Password');
      return false;
    } else if (!passRegex.test(value)) {
      alert("Incorrect Password\nPlease Enter Password of characters between 8-15 with atleast \n1. One Uppercase Letter \n2. One Lowercase Letter \n3.One Special Character");
      return false;
    }

    return true;
  }

  function checkPassword(password, conPassword) {
    if (password != conPassword) {
      alert("Passwords Do not Match");
      $('#cpwd').val('');
      return false;
    }

    return true;
  }

  function validateSignUpForm() {
    var firstName = $('#fname').val();
    var lastName = $('#lname').val();
    var email = $('#signup-email').val();
    var password = $('#signup-pwd').val();
    var conPassword = $('#cpwd').val();

    if (nameRegex.test(firstName) && nameRegex.test(lastName) && emailRegex.test(email) && passRegex.test(password) && conPassword == password) {
      $('#signup-btn').removeAttr('disabled');
    }
  }

  function validateLoginForm() {
    var email = $('#login-email').val();
    var password = $('#login-pwd').val();

    if (emailRegex.test(email) && passRegex.test(password)) {
      $('#login-btn').removeAttr('disabled');
    }
  }
});