import React from "react"
import { useHistory } from "react-router"
import * as Api from "../../api"
import Button from "./Button"

interface CategoriesProps {
  categories: Api.NullableString[]
}

const Categories = ({ categories }: CategoriesProps): React.ReactElement => {
  const history = useHistory()
  return (
    <div className="py-4">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Product Categories
      </h2>
      <div className="flex gap-4 my-4 items-center">
        <Button className="bg-purple-700 text-white hover:bg-purple-500">
          # All Tags
        </Button>
        {categories.map((category, index) => (
          <Button
            onClick={() => history.push(`/category/${category}`)}
            key={index}
          >
            # {category}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Categories
