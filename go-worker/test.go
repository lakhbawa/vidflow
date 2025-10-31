package main
import ("fmt")


func main() {
	dataChan := make(chan int)

	go func () {
		dataChan <- 1
	}()
	// dataChan <- 1

	n := <- dataChan
	fmt.Println(n)
}
