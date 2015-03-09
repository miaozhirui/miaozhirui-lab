<?php
// 主程序
class mainController extends Controller
{
    // 首页
    public function _index() {
        $this->pageName = 'index';
        $this->view();
    }
    //transition页面
    public function _transition() {
        $this->pageName = 'transition';
        $this->view();
    }

    public function _components() {
$this->pageName = 'components';
$this ->view();
} 
}

