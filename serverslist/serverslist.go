package serverslist

import (
	"hash/fnv"
	"io/ioutil"
	"log"
	"net/url"
	"strings"

	"github.com/michep/snaptel-ui-go/models"
	"strconv"
)

var (
	servers     map[string]models.SnapServer = make(map[string]models.SnapServer)
	initialized                              = false
)

func LoadServersList(fname string) error {
	fdata, err := ioutil.ReadFile(fname)
	if err != nil {
		return err
	}
	lines := strings.Split(string(fdata), "\n")
	h := fnv.New32()
	for _, line := range lines {
		tline := strings.TrimSpace(line)
		u, err := url.Parse(tline)
		if err != nil {
			log.Printf(err.Error())
			continue
		}
		if len(tline) > 0 {
			h.Reset()
			h.Write([]byte(tline))
			k := strconv.Itoa(int(h.Sum32()))
			servers[k] = models.SnapServer{Host: u.String(), Key: k}
		}
	}
	initialized = true
	log.Printf("%v hosts loaded from file", len(servers))
	return nil
}

func GetServersList() map[string]models.SnapServer {
	return servers
}
