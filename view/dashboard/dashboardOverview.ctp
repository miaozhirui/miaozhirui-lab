<?php include('./view/layout/header.ctp') ?>
<!--未登录情况下显示.unlogin-show-->
<div class="container">
    <div class="unlogin-show">
        <h2>Request a free trial to view this content</h2>
        <div class="trial-btn-wrap">
            <a href="/?v=requestTrial" class="public-green-btn">Request Trial</a>
            <a  href="/?v=login" class="public-white-btn">Login</a>
        </div>
    </div>
    <?php include('./view/dashboard/dashboardInfo.ctp') ?>
    <div class="dashboard-nav">
        <div class="dashboard-nav-main">
            <ul class="dashboard-nav-ul">
                <li><a  href="/?v=dashboardOverview" class="current">Overview</a></li>
                <li><a  href="/?v=dashboardValue">Value</a></li>
                <li><a  href="/?v=dashboardRisk">Risk</a></li>
            </ul>
        </div>
    </div>
    <div class="container-main">
        <h2 class="overview-h2">Overview</h2>
        <ul class="dashboard-overview-ul">
            <li>
                <h3>Total Patent</h3>
                <p>1244</p>
            </li>
            <li>
                <h3>Employees</h3>
                <p>34,111</p>
            </li>
            <li>
                <h3>Revenue(USD)</h3>
                <p>$12.4bn</p>
                <span class="year">2011</span>
            </li>
            <li>
                <h3>Op.Income(USD)</h3>
                <p>$24.9bn</p>
                <span class="year">2012</span>
            </li>
            <li class="no-border">
                <h3>Net Profit</h3>
                <p>$12,555</p>
                <span class="year">2013</span>
            </li>
        </ul>
        <h2 class="overview-h2">Charts</h2>
        <div class="charts-space">
            
        </div>
        <div class="form-wrap-table">
            <div class="products-wrap">
                <h2 class="overview-h2">Products</h2>
                <table class="common-table">
                    <colgroup>
                        <col style="width:30%">
                        <col style="width:50%">
                        <col style="width:20%">
                    </colgroup>
                    <tr>
                        <th class="first">Product</th>
                        <th>Industry</th>
                        <th class="last">Revenue</th>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>Electric Digital Data</td>
                        <td class="last">$23</td>
                    </tr>
                    <tr>
                        <td class="first">Google Book</td>
                        <td>Transmission</td>
                        <td class="last">$33</td>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>Electric Digital Data</td>
                        <td class="last">$32423</td>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>ELECTRIC DIGITAL DATA PROCESSING TRANSMISSION ELECTRIC DIGITAL </td>
                        <td class="last">$3323</td>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>Electric Digital Data</td>
                        <td class="last">$32423</td>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>ELECTRIC DIGITAL DATA PROCESSING TRANSMISSION ELECTRIC DIGITAL </td>
                        <td class="last">$332423</td>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>Electric Digital Data</td>
                        <td class="last">$12423</td>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>Electric Digital Data</td>
                        <td class="last">$32423</td>
                    </tr>
                    <tr>
                        <td class="first">Google play</td>
                        <td>ELECTRIC DIGITAL DATA PROCESSING TRANSMISSION ELECTRIC DIGITAL </td>
                        <td class="last">$332423</td>
                    </tr>
                    
                </table>
            </div>
            <div class="inventor-wrap">
                <h2 class="overview-h2">Top Inventor</h2>
                <table class="common-table">
                    <colgroup>
                        <col style="width:70%">
                        <col style="width:30%">
                    </colgroup>
                    <tr>
                        <th class="first">Name</th>
                        <th class="last">Number</th>
                    </tr>
                    <tr>
                        <td class="first">1.Jay Tyner</td>
                        <td class="last">23242</td>
                    </tr>
                    <tr>
                        <td class="first"> 2. Russ Jalbert</td>
                        <td class="last">1242</td>
                    </tr>
                    <tr>
                        <td class="first">3. John Tyner </td>
                        <td class="last">223</td>
                    </tr>
                    <tr>
                        <td class="first">4. Jay Tyner</td>
                        <td class="last">42</td>
                    </tr>
                    <tr>
                        <td class="first">5. Russ</td>
                        <td class="last">214</td>
                    </tr>
                    <tr>
                        <td class="first">6.Jay Tyner</td>
                        <td class="last">768</td>
                    </tr>
                    <tr>
                        <td class="first">7. Jay Tyner</td>
                        <td class="last">76865</td>
                    </tr>
                     <tr>
                        <td class="first">8. John Tyner </td>
                        <td class="last">223</td>
                    </tr>
                    <tr>
                        <td class="first">9. Jay Tyner</td>
                        <td class="last">42</td>
                    </tr>
                    <tr>
                        <td class="first">10. Russ</td>
                        <td class="last">214</td>
                    </tr>
                </table>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>
<?php include('./view/layout/footer.ctp') ?>