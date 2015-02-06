<?php include('./view/layout/header.ctp') ?>
<div class="container">
    <div class="edit-main">
        <div class="edit-step" style="height:100px">
            <ul>
                <li class="edit-step1 edit-progress-on" style="width:50%;display:inline-block;float:left">
                    <h1 style="display:inline">Step1.</h1><span style="font-size: 18px">Edit Company</span>
                    <a><div class="edit-step1-progress edit-progress-on"></div></a>
                </li>
                <li class="edit-step1" style="width:50%;display:inline-block;float:left">
                    <h1 style="display:inline">Step2.</h1><span style="font-size: 18px">Edit Comparables</span>
                    <a><div class="edit-step2-progress"></div></a>
                </li>
            </ul>
        </div>
        <div class="edit-search">
            <input class="edit-search-input" style="width:600px"></input>
            <a href="" class="edit-search-btn">Search</a>
        </div>
        <div class="tree" style="min-height: 500px"></div>
        <div class="content"></div>
    </div>

</div>

<?php include('./view/layout/footer.ctp') ?>