<?php include('./view/layout/header.ctp') ?>
<div class="container">
    <div class="edit-step">
        <ul>
            <li class="edit-step1 edit-progress-on" style="width:50%;display:inline-block;float:left">
                <div style="margin-bottom: 10px">
                    <h1 style="display:inline">Step1.</h1><span style="font-size: 18px">Edit Company</span>
                </div>
                <a><div class="edit-step1-progress edit-progress-on"></div><div class="edit-progress-icon"></div></a>
            </li>
            <li class="edit-step2" style="width:50%;display:inline-block;float:left">
                <div style="margin-bottom: 10px">
                    <h1 style="display:inline">Step2.</h1><span style="font-size: 18px;">Edit Comparables</span>
                </div>
                <a><div class="edit-step2-progress"></div><div class="edit-progress-icon"></div></a>
            </li>
        </ul>
    </div>
    <div class="edit-main">

        <div class="edit-title">
            <h1 style="color:#999;font-family: Arial;font-size: 24px;">
                Step 1
            </h1>
            <h1 style="color:#555;font-size: 24px;margin-top: 12px" >
                Edit Main Company
            </h1>

        </div>
        <div class="edit-search">
            <input class="edit-search-input"></input>
            <a href="javascript:;" class="edit-search-btn" data-bind="click:search">Search</a>
            <div data-bind='visible:noResult()' class="edit-search-no-result">
                <span>No Company found. Please retry another company name.</span>
            </div>
        </div>



        <div class="edit-tree" style="display: none"></div>

    </div>
    <div class="edit-submit">
        <div class="edit-company-info">
            <span style="color:#999;font-size:14px;">Selected Main Company</span>
            <h2 style="color:#555;font-size:20px;margin-top: 8px" class="edit-company-name" data-bind="text:companyInfo().assigneeName,
            attr:{'data-assigneeId':companyInfo().assigneeId,'data-id':itemId}"></h2>
            <div style="color:#555;font-size:14px;display: inline-block;width: 100px;margin-top: 4px"><span>Subsidiary: </span>
                <span class="edit-company-sub" data-bind="text:companyInfo().subNum"></span>
            </div>
            <div style="color:#555;font-size:14px;display: inline-block;margin-top: 4px"><span>Patents: </span>
                <span class="edit-company-patents" data-bind="text:companyInfo().patentNum"></span>
            </div>
        </div>
        <div class="edit-submit-btns">
            <a href="/?v=dashboardOverview" class="edit-btn-white edit-cancel-btn">Cancel</a>
            <a data-bind="click:saveCompany" class="edit-btn-green edit-next-btn">Next</a>
        </div>
    </div>

</div>

<?php include('./view/layout/footer.ctp') ?>