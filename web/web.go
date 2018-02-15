package web

import (
	"net/http"
	"path"
	"time"
)

func ServeFileOrIndex(w http.ResponseWriter, r *http.Request) {
	fname := r.URL.Path
	f, exist := _escData[path.Clean(fname)]
	if !exist || f.isDir {
		fname = "/index.html"
	}
	data, _ := FS(false).Open(fname)
	http.ServeContent(w, r, fname, time.Now(), data)
}
