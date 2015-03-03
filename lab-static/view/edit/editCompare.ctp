<?php include('./view/layout/header.ctp') ?>
<div class="container">
    <div class="edit-step" style="">
        <ul>
            <li class="edit-step1" style="width:50%;display:inline-block;float:left">
                <div style="margin-bottom: 10px">
                <h1 style="display:inline">Step1.</h1><span style="font-size: 18px">Edit Company</span>
                </div>
                <a><div class="edit-step1-progress"></div><div class="edit-progress-icon"></div></a>
            </li>
            <li class="edit-step2  edit-progress-on" style="width:50%;display:inline-block;float:left">
                <div style="margin-bottom: 10px">
                <h1 style="display:inline;margin-top:10px">Step2.</h1><span style="font-size: 18px">Edit Comparables</span>
                </div>
                <a><div class="edit-step2-progress  edit-progress-on"></div><div class="edit-progress-icon"></div></a>
            </li>
        </ul>
    </div>
    <div class="edit-compare-main">
        <div class="edit-compare-title">
            <h1 style="color:#999999">
                Step 2
            </h1>
            <h1 style="display: inline-block;color:#555;font-size: 24px;margin-top: 12px" ">
                Edit Comparables
            </h1>
            <span  style="color:#999;float: right;font-size: 12px;margin-top: 20px">Maximum limit of 6 comparable companies</span>
        </div>

        <div class="edit-compare-error"  data-bind="visible:errorMsg() != ''">
             <span data-bind="text:errorMsg()"></span>
        </div>

        <table class="edit-compare-list">
            <thead>
                <th width="70%">Company Name</th>
                <th width="20%">Patent Count</th>
                <th width="5%">Action</th>
            </thead>
            <tbody data-bind="foreach:compareList()">
                <!-- ko if:(!$data.addbtn) -->
                <tr>
                    <td width="70%" data-bind="text:competitorName,attr:{'data-subNum:subNum"></td>
                    <td style='color:#999' width="20%" data-bind="text:patentNum"></td>
                    <!-- ko if: (!$data.holder || $data.holder!=true)  -->
                    <td  width="5%">
                        <a data-bind="click:$parent.removeCompare,attr:{'data-competitorId':competitorId}" >
                            <div class="edit-compare-remove-icon"></div>
                        </a></td>
                    <!-- /ko -->
                    <!-- ko if: ($data.holder && $data.holder==true)  -->
                    <td  width="5%"><a></a></td>
                    <!-- /ko -->
                </tr>
                <!-- /ko -->
                <!-- ko if:($data.addbtn == true) -->
                <tr style='height:24px;'>
                    <td>
                    <a style="margin-right: 10%;line-height: 24px;float:right;color:#75bb00;font-size:14px;font-weight:bold" data-bind="click:$parent.addNewCompare">
                        + Add New Comparables
                    </a></td>
                    <td></td>
                    <td></td>
                </tr>
                <!-- /ko -->
            </tbody>
        </table>
        <div class="edit-compare-search-section" data-bind="visible:showSearch">
            <div style="display: inline-block;margin-left: 70px;">
                <span style="font-size: 18px;font-weight: bold;color:#555;">Add New Comparables</span>
            </div>
            <div style="display: inline-block;float: right;margin-right: 70px;color: #999;font-size: 14px">
                <span>Collapse Add New Comparables</span>
                <a  data-bind="click:hideSearch()">
                    <div class="edit-compare-hide-icon"></div>
                </a>
            </div>
            <div class="edit-compare-search">
                <input class="edit-compare-search-input" style="width:790px"></input>
                <a href="javascript:;" class="edit-compare-search-btn" data-bind="click:showSearchTree">Search</a>
            </div>
            <div class="edit-compare-tree" style="display: none"></div>

        </div>


        <div  data-bind="visible:removeList().length > 0">
            <h4 style="margin-left: 60px;font-size: 14px;color:#555">Removed:</h4>
            <table class="edit-compare-remove" >
                <thead>
                <th width="70%">Company Name</th>
                <th width="20%">Patent Count</th>
                <th width="5%">Action</th>
                </thead>
                <tbody data-bind="foreach:removeList()">
                <tr>
                    <td width="70%" data-bind="text:competitorName,attr:{'data-subNum':subNum}"></td>
                    <td style="color:#999" width="20%" data-bind="text:patentNum"></td>
                    <td  width="5%"><a data-bind="click:$parent.recoverCompare,attr:{'data-competitorId':competitorId}">
                        <div class="edit-compare-add-icon"></div>
                    </a></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="edit-compare-submit">
            <div class="edit-compare-submit-btns">
                <a href="/?v=dashboardOverview" class="edit-btn-white edit-compare-cancel-btn">Cancel</a>
                <a href="/?v=editCompare" data-bind="click:saveCompare,css:{disabled:lessThanThree()}" class="edit-btn-green edit-compare-generate-btn">Generate</a>
            </div>
        </div>
    </div>
</div>
<?php include('./view/layout/footer.ctp') ?>
