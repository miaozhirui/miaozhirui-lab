<?php include('./view/layout/header.ctp') ?>
<!--未登录情况下显示.unlogin-show-->
<div class="container">
    <?php include('./view/dashboard/dashboardInfo.ctp') ?>
    <div class="dashboard-nav">
        <div class="dashboard-nav-main">
            <ul class="dashboard-nav-ul">
                <li><a href="/?v=dashboardOverview">Overview</a></li>
                <li><a href="/?v=dashboardValue" class="current">Value</a></li>
                <li><a href="/?v=dashboardRisk">Risk</a></li>
            </ul>
        </div>
    </div>
    <div class="container-main">
        <ul class="change-charts-ul">
        	<li><a data-tabindex="summary" class="current">Summary</a></li>
        	<li><a data-tabindex="technologyImpact" >Technology impact</a></li>
        	<li><a data-tabindex="territorial">Territorial Coverage</a></li>
        	<li><a data-tabindex="technologyScope">Technology Scope</a></li>
        	<li><a data-tabindex="generality">Generality</a></li>
        </ul>
        <div class="charts-wrap">
            <div class="charts-1">

            </div>
            <div class="charts-2">

            </div>
        </div>

    </div>
</div>
<?php include('./view/layout/footer.ctp') ?>