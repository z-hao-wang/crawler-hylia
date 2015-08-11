<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
<?php 
foreach($css_files as $file): ?>
	<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
<?php endforeach; ?>
<?php foreach($js_files as $file): ?>
	<script src="<?php echo $file; ?>"></script>
<?php endforeach; ?>
<script type="text/javascript">
  function setAll() {
    var all_ids = [];
    $('a.download-link').each(function () {
      var href = $(this).attr('href');
      var matches = href.match(/id=(\d+)&album_id/)
      all_ids.push(matches[1]);
    });
    var url = "/index.php/welcome/setMultiple/?ids=" + all_ids.join(',');
    document.getElementById('if1').src = url;
    location.reload();
  }
  $(document).ready(function () {
    $('a.download-link').on('click', function (e) {
      e.preventDefault();
      document.getElementById('if1').src = $(this).attr('href');
      location.reload();
    });
  });
  
</script>
<style type='text/css'>
body
{
	font-family: Arial;
	font-size: 14px;
}
a {
    color: blue;
    text-decoration: none;
    font-size: 14px;
}
a:hover
{
	text-decoration: underline;
}
</style>
</head>
<body>
	<div>
		<a href="#" onClick="setAll();return false">Download All</a>
		<iframe style="display:none" id="if1"></iframe>
	</div>
	<div style='height:20px;'></div>  
    <div>
		<?php echo $output; ?>
    </div>
</body>
</html>
