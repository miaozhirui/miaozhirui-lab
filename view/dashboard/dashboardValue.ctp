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
        	<li><a data-tabindex="summary">Summary</a></li>
        	<li><a data-tabindex="technology" class="current">Technology impact</a></li>
        	<li><a data-tabindex="territorial">Territorial Coverage</a></li>
        	<li><a data-tabindex="technology">Technology Scope</a></li>
        	<li><a data-tabindex="generality">Generality</a></li>
        </ul>
        <div class="charts-wrap">
			图表背景蓝色辩于识别留空区域，到时要把背景色去掉
        </div>
    </div>
</div>
<?php include('./view/layout/footer.ctp') ?>