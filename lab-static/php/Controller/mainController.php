<?php
// 主程序
class mainController extends Controller {

public function _index() {
$this->pageName = 'index';
$this ->view('index/index.ctp');
} 

public function _list() {
$this->pageName = 'list';
$this ->view();
} 

public function _dashboardOverview() {
$this->pageName = 'dashboardOverview';
$this ->view('dashboard/dashboardOverview.ctp');
}

public function _editCompany() {
$this->pageName = 'editCompany';
// $this->data = array(
//         'name'=>'houdunwang'
//     );
$this ->view('edit/editCompany.ctp');
}

public function _editCompare() {
$this->pageName = 'editCompare';
$this ->view('edit/editCompare.ctp');
}

public function _dashboardValue() {
$this->pageName = 'dashboardValue';
$this ->view('dashboard/dashboardValue.ctp');
}
public function _login() {
$this->pageName = 'login';
$this ->view('login/login.ctp');
}
public function _requestTrial() {
$this->pageName = 'requestTrial';
$this ->view('login/requestTrial.ctp');
}
public function _acknowledgement() {
$this->pageName = 'acknowledgement';
$this ->view('login/acknowledgement.ctp');
}
}