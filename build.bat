pushd web\app\
cmd.exe /c ng build --prod
popd

go generate
go build -o dist/snaptel-ui.exe .
