"use client";
export default function Home() {

    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    const itemsState = items.map((item, index) => {
        return {name: item, index: index,  selected: false}
    })

    console.log(itemsState)

    let recentlyClicked = null
  const selectItem = function(event: never, index: number) {
      console.log( index)
        if (recentlyClicked === index) {
          return;
      }
      itemsState.map((item) => {
          if (item.index === index || item.index === recentlyClicked) {
                item.selected = true
          } else{
                item.selected = false
          }
      })
      recentlyClicked = index

  }

    return (
    <>
      {itemsState.map((item, index) => (
        <span
          key={item.index}
          className={item.selected == true ? "highlight" : ""}
          onClick={selectItem.bind(null, null,  item.index)}
        >
          {item.name}
        </span>
      ))}
    </>
  );
}
