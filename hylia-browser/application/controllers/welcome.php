<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Welcome extends CI_Controller {

  function __construct()
  {
      parent::__construct();


      /* Standard Libraries */
      $this->load->database();
      $this->load->helper('url');

      /* ------------------ */    

      $this->load->library('grocery_CRUD');    
  }
  function _example_output($output = null)

  {
      $this->load->view('example.php',$output);    
  }
  
  public function index() {
    redirect('/welcome/albums/', 'location');
  }
  
  function _full_text($value, $row)
  {
    return $value = wordwrap($row->title, 100, "<br>", true);
  }
  
  public function albums()
	{
	  $crud = $this->grocery_crud;
	  $crud->set_table('anime_mp3_albums');
	  $crud->order_by('title', 'asc');
	  $crud->columns('album_id', 'title');
	  $crud->unset_edit();
	  $crud->unset_delete();
	  $crud->callback_column('title', array($this, '_full_text'));
	  $crud->add_action('viewSongs', '/assets/grocery_crud/themes/flexigrid/css/images/add.png', '','ui-icon-image', array($this,'viewSongs'));
		$output = $crud->render();
    $this->_example_output($output);
	}
	
	public function viewSongs($primary_key , $row) {
	  return site_url('welcome/songs/').'?album_id='.$primary_key;
	}

	public function songs()
	{
	  if(!$_GET['album_id']) {
	    return false;
	  }
	  $album_id = $_GET['album_id'];
	  $crud = $this->grocery_crud;
	  $crud->where('album_id', $album_id);
	  $crud->set_table('anime_mp3_songs');
	  $crud->columns('id', 'title','to_download', 'album_id');
	  $crud->callback_column('title', array($this, '_full_text'));
	  $crud->unset_read();
	  $crud->unset_edit();
	  $crud->unset_delete();
	  $crud->add_action('setToDownload', '/assets/grocery_crud/themes/flexigrid/css/images/add.png', '','download-link', array($this,'setDownloadLink'));
		$output = $crud->render();
    $this->_example_output($output);
	}
	public function setDownloadLink($primary_key , $row) {
	  return site_url('welcome/set_download/').'?id='.$primary_key . '&album_id='.$row->album_id;
	}
	public function set_download(){
	  if($_GET['id']) {
	    $id = $_GET['id'];
	    $data = array(
               'to_download' => 1
            );
      $this->db->where('id', $id);
      $this->db->update('anime_mp3_songs', $data); 
	  }
	  //Set and refresh
	  //redirect('/welcome/songs/?album_id=' . $_GET['album_id'], 'location');
	}
	public function setMultiple() {
	  if($_GET['ids']) {
	    $ids = explode(',', $_GET['ids']);
	    $this->db->where_in('id', $ids);
	    $this->db->update('anime_mp3_songs', array('to_download' => 1));
	    //Set and refresh
	    //redirect('/welcome/songs/?album_id=' . $_GET['album_id'], 'location'); 
	  }
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */