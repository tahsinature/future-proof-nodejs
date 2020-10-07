import { bookSeeder } from './Book'

export = async () => {
  await bookSeeder.seed(10)
}
