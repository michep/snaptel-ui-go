package params

type Params struct {
	Debug        bool   `short:"d" long:"debug" description:"enable debug logging"`
	PprofAddr    string `short:"p" long:"pprof" description:"enable pprof, listen on this address"`
	ListenAddr   string `short:"l" long:"listen" required:"true" description:"snaptel-ui listen address"`
	SnapListFile string `short:"f" long:"file" required:"true" description:"file with list of snap-telemetry URLs"`
}
