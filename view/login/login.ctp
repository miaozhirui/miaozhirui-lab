<?php include('./view/layout/header.ctp') ?>
<div class="container">
    <div class="login-wrap">
        <div class="login-main">
            <h1>Welcome to Insights</h1>
            <i class="email-icon"></i>
            <input type="text" class="login-input" placeholder="Email">
             <i class="password-icon"></i>
            <input type="password" class="login-input" placeholder="Password">
            <input type="submit" class="form-green-btn" value="Login">
        </div>
        <div class="no-account">
            <p>No account yet?</p>
            <p>Contact us to request trial</p>
            <a href="/?v=requestTrial"class="public-green-border-btn">Request Trial</a>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<?php include('./view/layout/footer.ctp') ?>