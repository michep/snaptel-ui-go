package web

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/michep/snaptel-ui-go/serverslist"
	"io/ioutil"
	"log"
	"net/http"
)

func GetTasksList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	url := fmt.Sprintf(snapserver.Host + "/v2/tasks")
	request("GET", url, w)
}

func GetTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	taskid := vars["id"]
	url := fmt.Sprintf(snapserver.Host + "/v2/tasks/" + taskid)
	request("GET", url, w)
}

func TaskAction(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	taskid := vars["id"]
	url := fmt.Sprintf(snapserver.Host + "/v2/tasks/" + taskid + "?" + r.URL.RawQuery)
	request("PUT", url, w)
}

func GetMetricsList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	url := fmt.Sprintf(snapserver.Host + "/v2/metrics")
	request("GET", url, w)
}

func GetPluginsList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	url := fmt.Sprintf(snapserver.Host + "/v2/plugins")
	request("GET", url, w)
}

func request(method string, url string, w http.ResponseWriter) {
	req, _ := http.NewRequest(method, url, nil)
	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Print(err.Error())
		http.Error(w, err.Error(), 408)
		return
	}
	defer resp.Body.Close()
	bbody, _ := ioutil.ReadAll(resp.Body)
	w.Write(bbody)
}
