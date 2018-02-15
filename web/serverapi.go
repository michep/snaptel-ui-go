package web

import (
	"github.com/gorilla/mux"
	"net/http"

	"encoding/json"
	"github.com/michep/snaptel-ui-go/serverslist"
)

func GetServersList(w http.ResponseWriter, r *http.Request) {
	servers := serverslist.GetServersList()
	json.NewEncoder(w).Encode(servers)
}

func GetServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	serverid := vars["id"]
	snapserver := serverslist.GetServersList()[serverid]
	json.NewEncoder(w).Encode(snapserver)

}
