set libPath=.\src\
set compressTool=yuicompressor.jar
set appPath=.\src\
set releasePath=.\build\
set version=2.0\
set appname=VisualJS\
set apiName=visualjs.js

mkdir %releasePath%
mkdir %releasePath%%version%
mkdir %releasePath%%version%template
mkdir %releasePath%%version%%appname%
mkdir %releasePath%%version%%appname%js
mkdir %releasePath%%version%jsLinb
mkdir %releasePath%%version%jsLinb\js
mkdir %releasePath%%version%jsLinb\Locale
mkdir %releasePath%%version%jsLinb\appearance

copy %libPath%loading.gif %releasePath%%version%\  /Y
copy %libPath%index.html %releasePath%%version%\  /Y

xcopy %libPath%template\*.* %releasePath%%version%template\ /E /Y
xcopy %libPath%jsLinb\appearance\*.* %releasePath%%version%jsLinb\appearance\ /E /Y
xcopy %libPath%jsLinb\Locale\*.* %releasePath%%version%jsLinb\Locale\ /E /Y
copy  %libPath%jsLinb\ondrag.gif %releasePath%%version%jsLinb\ondrag.gif
copy  %libPath%jsLinb\bg.gif %releasePath%%version%jsLinb\bg.gif

rem xcopy %appPath%css\*.* %releasePath%%version%%appname%css\ /E /Y
xcopy %appPath%Locale\*.* %releasePath%%version%Locale\ /E /Y
xcopy %appPath%img\*.* %releasePath%%version%img\ /E /Y

copy %appPath%%apiName% %releasePath%%version%%apiName%

copy %libPath%jsLinb\js\linb.js /b + %libPath%jsLinb\js\Event.js /b + %libPath%jsLinb\js\Date.js /b + %libPath%jsLinb\js\CSS.js /b + %libPath%jsLinb\js\Dom.js /b  + %libPath%jsLinb\js\Template.js /b + %libPath%jsLinb\js\Com.js /b + %libPath%jsLinb\js\Cookies.js /b + %libPath%jsLinb\js\DragDrop.js /b + %libPath%jsLinb\js\History.js /b + %libPath%jsLinb\js\ComFactory.js /b +  %libPath%jsLinb\Locale\en.js /b + %libPath%jsLinb\js\Debugger.js /b + %appPath%js\conf.js /b linb.js

copy %libPath%jsLinb\js\UI.js /b + %libPath%jsLinb\js\Coder.js /b + %libPath%jsLinb\js\Tips.js /b + %libPath%jsLinb\js\UI\Border.js /b + %libPath%jsLinb\js\UI\Shadow.js /b + %libPath%jsLinb\js\UI\Resizer.js /b + %libPath%jsLinb\js\UI\Image.js /b + %libPath%jsLinb\js\UI\Block.js /b + %libPath%jsLinb\js\UI\Label.js /b + %libPath%jsLinb\js\UI\ProgressBar.js /b + %libPath%jsLinb\js\UI\Button.js /b + %libPath%jsLinb\js\UI\CheckBox.js /b + %libPath%jsLinb\js\UI\Input.js /b + %libPath%jsLinb\js\UI\ComboInput.js /b + %libPath%jsLinb\js\UI\Group.js /b + %libPath%jsLinb\js\UI\Fieldset.js /b + %libPath%jsLinb\js\UI\ColorPicker.js /b + %libPath%jsLinb\js\UI\DatePicker.js /b + %libPath%jsLinb\js\UI\TimePicker.js /b + %libPath%jsLinb\js\UI\TimeLine.js /b + %libPath%jsLinb\js\UI\List.js /b + %libPath%jsLinb\js\UI\LinkList.js /b + %libPath%jsLinb\js\UI\Gallery.js /b + %libPath%jsLinb\js\UI\IconList.js /b + %libPath%jsLinb\js\UI\Poll.js /b + %libPath%jsLinb\js\UI\Panel.js /b + %libPath%jsLinb\js\UI\PageBar.js /b + %libPath%jsLinb\js\UI\Tabs.js /b + %libPath%jsLinb\js\UI\Stacks.js /b + %libPath%jsLinb\js\UI\ButtonViews.js /b + %libPath%jsLinb\js\UI\RadioBox.js /b + %libPath%jsLinb\js\UI\FoldingList.js /b + %libPath%jsLinb\js\UI\TreeBar.js /b + %libPath%jsLinb\js\UI\PopMenu.js /b + %libPath%jsLinb\js\UI\MenuBar.js /b + %libPath%jsLinb\js\UI\ToolBar.js /b + %libPath%jsLinb\js\UI\Range.js /b + %libPath%jsLinb\js\UI\Layout.js /b + %libPath%jsLinb\js\UI\TreeGrid.js /b + %libPath%jsLinb\js\UI\Dialog.js /b + %libPath%jsLinb\js\UI\TextEditor.js /b + %libPath%jsLinb\js\UI\Calendar.js /b  + %libPath%Locale\en.js /b + %appPath%\js\exLinb\AdvResizer.js /b + %appPath%js\index.js /b + %appPath%js\PageEditor.js /b + %appPath%js\ClassTool.js /b + %appPath%js\ClassEditor.js /b + %appPath%js\ClassStruct.js /b + %appPath%js\ObjectEditor.js /b + %appPath%js\ProjectPro.js /b + %appPath%js\ProjectSelector.js /b + %appPath%js\Designer.js /b + %appPath%js\AddFile.js /b + %appPath%js\DelFile.js /b + %appPath%js\About.js /b + %appPath%js\UIDesigner.js /b + %appPath%js\OpenFile.js /b index.js

java -jar %compressTool% -o %releasePath%%version%jsLinb/js/linb.js      --nomunge   linb.js
java -jar %compressTool% -o %releasePath%%version%%appname%js/index.js   --nomunge   index.js

cls
copy linb.js .\build\%version%\jsLinb\js\linb.js
copy index.js .\build\%version%\VisualJS\js\index.js
del /q linb.js
del /q index.js

@echo ==========================================================
@echo  Project built! If everything went fine, you can start it
@echo  by opening .\build\2.0\index.html in your fav browser.
@echo ==========================================================

pause
