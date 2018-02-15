//go:generate esc -o=web/static.go -pkg=web -prefix web/app/dist web/app/dist

package main

import (
	"github.com/gorilla/mux"
	"github.com/jessevdk/go-flags"
	"log"
	"net/http"
	"os"

	"github.com/michep/snaptel-ui-go/params"
	"github.com/michep/snaptel-ui-go/serverslist"
	"github.com/michep/snaptel-ui-go/web"
)

func main() {
	par := params.Params{}
	_, err := flags.Parse(&par)
	if err != nil {
		os.Exit(1)
	}

	serverslist.LoadServersList(par.SnapListFile)

	r := mux.NewRouter()
	//r.Methods("PUT").Path("/serversapi/{id}").HandlerFunc(web.UpdateServer)
	//r.Methods("DELETE").Path("/serversapi/{id}").HandlerFunc(web.DeleteServer)
	r.Methods("GET").Path("/serversapi/{id}").HandlerFunc(web.GetServer)
	//r.Methods("POST").PathPrefix("/serversapi").HandlerFunc(web.CreateServer)
	r.Methods("GET").PathPrefix("/serversapi").HandlerFunc(web.GetServersList)
	r.PathPrefix("/serversapi").HandlerFunc(http.NotFound)

	r.Methods("PUT").Path("/snapapi/tasks/{server}/{id}").HandlerFunc(web.TaskAction)
	r.Methods("GET").Path("/snapapi/tasks/{server}/{id}").HandlerFunc(web.GetTask)
	r.Methods("GET").Path("/snapapi/tasks/{server}").HandlerFunc(web.GetTasksList)
	r.Methods("GET").Path("/snapapi/metrics/{server}").HandlerFunc(web.GetMetricsList)
	r.Methods("GET").Path("/snapapi/plugins/{server}").HandlerFunc(web.GetPluginsList)
	r.PathPrefix("/snapapi").HandlerFunc(http.NotFound)

	r.PathPrefix("/").HandlerFunc(web.ServeFileOrIndex)

	log.Printf("Snaptel-UI listening on %v", par.ListenAddr)
	log.Fatal(http.ListenAndServe(par.ListenAddr, r))
}
