import Library from "../Shared/LibraryCard/LibraryCard"
import "./ShareLibrary.css"

function ShareLibrary() {
    const LIBRARIES = [
        {
            id: 1,
            title: 'Shared library',
            description: 'hobby books',
            portrait:'https://t1.pixers.pics/img-d5043af1/cuadros-en-lienzo-vector-del-libro-de-la-biblioteca-estante-fondo.png?H4sIAAAAAAAAA5VPQW7EIAz8TiKR2BAIkAfsdZ-ACCG7aUmCIG23-_oSVb1U6qHyYeyxPWPD25bt7MH57fAJ1mWagod5CaXKQ_J5efoKiZC8HgobKkSsh_3dJ5f2WDVck0Yw0lNKelT18GHL4mrTa3U_jpgHgNy1cXkUtQIug1szMKQSsAOhpslLyvtOc29i2I9tbzp8dNjG7UbwjHqwMYZPk3zxzN7YEO_2H-KCzZ3kZh-TfTa_LeqfDzki4edn816uP6qzB3-YfOdQxuFyBckAFSgGVJ-UuVwlQ6UY1WbUmjMvlZbzPBZCSzcJJ4TgBdSI7Uu8fQHWxPvVgAEAAA=='
        },
        {
            id: 2,
            title: 'Shared library',
            description: 'hobby books',
            portrait:'https://t1.pixers.pics/img-d5043af1/cuadros-en-lienzo-vector-del-libro-de-la-biblioteca-estante-fondo.png?H4sIAAAAAAAAA5VPQW7EIAz8TiKR2BAIkAfsdZ-ACCG7aUmCIG23-_oSVb1U6qHyYeyxPWPD25bt7MH57fAJ1mWagod5CaXKQ_J5efoKiZC8HgobKkSsh_3dJ5f2WDVck0Yw0lNKelT18GHL4mrTa3U_jpgHgNy1cXkUtQIug1szMKQSsAOhpslLyvtOc29i2I9tbzp8dNjG7UbwjHqwMYZPk3zxzN7YEO_2H-KCzZ3kZh-TfTa_LeqfDzki4edn816uP6qzB3-YfOdQxuFyBckAFSgGVJ-UuVwlQ6UY1WbUmjMvlZbzPBZCSzcJJ4TgBdSI7Uu8fQHWxPvVgAEAAA=='

        },
        {
            title: 'Shared library',
            description: 'story books',
            portrait:'https://t1.pixers.pics/img-d5043af1/cuadros-en-lienzo-vector-del-libro-de-la-biblioteca-estante-fondo.png?H4sIAAAAAAAAA5VPQW7EIAz8TiKR2BAIkAfsdZ-ACCG7aUmCIG23-_oSVb1U6qHyYeyxPWPD25bt7MH57fAJ1mWagod5CaXKQ_J5efoKiZC8HgobKkSsh_3dJ5f2WDVck0Yw0lNKelT18GHL4mrTa3U_jpgHgNy1cXkUtQIug1szMKQSsAOhpslLyvtOc29i2I9tbzp8dNjG7UbwjHqwMYZPk3zxzN7YEO_2H-KCzZ3kZh-TfTa_LeqfDzki4edn816uP6qzB3-YfOdQxuFyBckAFSgGVJ-UuVwlQ6UY1WbUmjMvlZbzPBZCSzcJJ4TgBdSI7Uu8fQHWxPvVgAEAAA=='
            ,
            id: 3
        },
        {
            title: 'Shared library',
            description: 'animals books',
            portrait: 'https://sendia.ai/wp-content/uploads/2021/06/Grafica-Recursos-01.png',
            id: 4
        },
        {
            id: 5,
            title: 'Shared library',
            description: 'hobby books',
            portrait: 'https://sendia.ai/wp-content/uploads/2021/06/Grafica-Recursos-01.png'
        },
        {
            id: 6,
            title: 'Shared library',
            description: 'hobby books',
            portrait: 'https://sendia.ai/wp-content/uploads/2021/06/Grafica-Recursos-01.png'
        },
        {
            title: 'Shared library',
            description: 'story books',
            portrait: 'https://sendia.ai/wp-content/uploads/2021/06/Grafica-Recursos-01.png',
            id: 7
        },
        {
            title: 'Shared library',
            description: 'animals books',
            portrait: 'https://sendia.ai/wp-content/uploads/2021/06/Grafica-Recursos-01.png',
            id: 8
        }
    ];

    return (
        <>
           
            <div className="section_sharelibrary shadow p-3 mb-5 bg-body rounded ">
                {LIBRARIES.map(({ id, title, description,portrait }) => (
                    <div key={id} className="section_item">
                        <Library title={title}
                            description={description}
                            portrait={portrait}
                        />
                    </div>
                ))}
            </div>


        </>
    );
}
export default ShareLibrary;