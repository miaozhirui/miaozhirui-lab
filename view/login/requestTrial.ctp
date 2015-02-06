<?php include('./view/layout/header.ctp') ?>
<div class="container">
    <div class="login-wrap">
        <div class="login-main login-request">
            <h1>Request Free Trial</h1>
            <i class="name-icon"></i>
            <input type="text" class="login-input" placeholder="Name">
            <i class="email-icon-request"></i>
            <input type="text" class="login-input" placeholder="Email">
             <i class="phone-icon"></i>
            <input type="text" class="login-input" placeholder="Phone">
            <i class="company-icon"></i>
            <input type="text" class="login-input" placeholder="Company">
            <input type="submit" class="form-green-btn" value="Login">
        </div>
        <div class="no-account">
            <p>Already have an account</p>
            <p>Click here to login</p>
            <a href="/?v=login" class="public-green-border-btn">Login</a>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<?php include('./view/layout/footer.ctp') ?>