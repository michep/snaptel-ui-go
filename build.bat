pushd web\app\
cmd.exe /c ng build 
popd

go generate
go build -o dist/snaptel-ui.exe .
