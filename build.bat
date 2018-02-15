pushd web\app\
cmd.exe /c ng build 
popd

go generate
go build