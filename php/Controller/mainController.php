<?php
// 主程序
class mainController extends Controller {

public function _index() {
$this->pageName = 'index';
$this ->view('enter/index.ctp');
} 

public function _list() {
$this->pageName = 'list';
$this ->view();
} 

public function _dashboardOverview() {
$this->pageName = 'dashboardOverview';
$this ->view('dashboard/dashboardOverview.ctp');
}

public function _edit() {
$this->pageName = 'edit';
// $this->data = array(
//         'name'=>'houdunwang'
//     );
$this ->view('edit/edit.ctp');
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
$this ->view();
}
}