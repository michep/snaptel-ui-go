package web

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/michep/snaptel-ui-go/serverslist"
	"io/ioutil"
	"net/http"
)

func GetTasksList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	url := fmt.Sprintf(snapserver.Host + "/v2/tasks")
	req, _ := http.NewRequest("GET", url, nil)
	client := http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	bbody, _ := ioutil.ReadAll(resp.Body)
	w.Write(bbody)
}

func GetTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	taskid := vars["id"]
	url := fmt.Sprintf(snapserver.Host + "/v2/tasks/" + taskid)
	req, _ := http.NewRequest("GET", url, nil)
	client := http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	bbody, _ := ioutil.ReadAll(resp.Body)
	w.Write(bbody)
}

func TaskAction(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	taskid := vars["id"]
	url := fmt.Sprintf(snapserver.Host + "/v2/tasks/" + taskid + "?" + r.URL.RawQuery)
	req, _ := http.NewRequest("PUT", url, nil)
	client := http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	bbody, _ := ioutil.ReadAll(resp.Body)
	w.Write(bbody)
}

func GetMetricsList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	url := fmt.Sprintf(snapserver.Host + "/v2/metrics")
	req, _ := http.NewRequest("GET", url, nil)
	client := http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	bbody, _ := ioutil.ReadAll(resp.Body)
	w.Write(bbody)
}

func GetPluginsList(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	snapserver := serverslist.GetServersList()[vars["server"]]
	url := fmt.Sprintf(snapserver.Host + "/v2/plugins")
	req, _ := http.NewRequest("GET", url, nil)
	client := http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	bbody, _ := ioutil.ReadAll(resp.Body)
	w.Write(bbody)
}
