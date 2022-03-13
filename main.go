package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Test struct {
	Id   int    `json:"id"`
	Item string `json:"item"`
}

func main() {

	http.HandleFunc("/todo", getTodo)
	http.HandleFunc("/del", delTodo)

	http.ListenAndServe(":8080", nil)
}

func ErrorCheck(err error) {
	if err != nil {
		panic(err)
	}
}

func delTodo(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Methods", "*")

	err := r.ParseForm()
	ErrorCheck(err)

	delValue := r.Form.Get("test")

	db, err := sql.Open("mysql", "root:Love1122@/todo")
	ErrorCheck(err)

	stmt, err := db.Prepare("delete from todoitems where item=?")

	ErrorCheck(err)

	_, e := stmt.Exec(delValue)
	ErrorCheck(e)
}

func getTodo(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("mysql", "root:Love1122@/todo")

	if err != nil {
		panic(err)
	}

	rows, e := db.Query("select * from todoitems")
	ErrorCheck(e)

	var cont []Test

	for rows.Next() {
		var temp Test
		e = rows.Scan(&temp.Id, &temp.Item)
		ErrorCheck(e)
		cont = append(cont, temp)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Ty", "application/json")
	json.NewEncoder(w).Encode(cont)

	defer db.Close()
}
