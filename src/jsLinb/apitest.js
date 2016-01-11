document.open();
document.writeln(linb_ini.nodeid);
document.writeln(_.serialize(_.merge({},linb.ini)));    
document.close();