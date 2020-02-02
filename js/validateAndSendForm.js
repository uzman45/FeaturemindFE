function validateApplyForm(){
  $("form[name='apply']").validate({
    errorElement: 'div',
        errorPlacement: function(error, element) {
            error.insertAfter(element.parent());
        },
    // Specify validation rules
    rules: {
      firstname: {
        required:true,
        minlength: 2,
        maxlength:30
      },
      lastname:{ 
        required:true,
        minlength: 2,
        maxlength:30
      },
      email: {
        required: true,
        email: true
      },      
      phone: {
        required: true,
        minlength: 14,
        maxlength: 14,
      },
      resumeFile: {
        required: true,
        extension: "docx|doc|pdf"
    },
    
    },
    messages: {
      firstname: {
      required: "Please enter first name",
      minlength: "Please enter valid first name",
      maxlength: "Please enter valid first name",
     },      
     lastname: {
      required: "Please enter last name",
      minlength: "Please enter valid last name",
      maxlength: "Please enter valid last name",
     },     
     phone: {
      required: "Please enter phone number",
      minlength: "Phone number field accept only 10 digits",
      maxlength: "Phone number field accept only 10 digits",
     },     
     email: {
      required: "Please enter email address",
      email: "Please enter a valid email address.",
     },
     resumeFile : {
       required : "Please upload your CV",
       extension: "Please valid formats for your CV (pdf,doc or docx)"
     }
    },
    submitHandler: function(form,event)
    {  
      event.preventDefault(); 
      //prevent resubmit while ajax
       $("#btnSubmit").attr("disabled", true);

      var file_data =$('input[type=file]')[0].files[0];  
      var form_data = new FormData();              
      form_data.append('firstname','Hasna');
      form_data.append('lastname','wewqe');
      form_data.append('phone','(537)-123-3213');
      form_data.append('email','ada@gmail.com');   
      form_data.append('resume', file_data);                            
      $.ajax({
        url: 'https://still-beyond-77071.herokuapp.com/apply',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,                         
        type: 'post',
        success: function(res){
            if(res.status){
              swal("Good job!", res.message, "success");
              $("#applyForm")[0].reset();
              $('#resumeFile').prev('label').text('Upload File');
            }
            else{
            swal("Oopps!", res.message, "warning");
            }
        },
        error:function(err){
          swal("Oopps!", JSON.stringify(err), "warning");
          
        }
     });
     //After ajax call clickable 
     $("#btnSubmit").attr("disabled", false);
  
      
        
   
    
}
    
 
            
    
    
  });
}