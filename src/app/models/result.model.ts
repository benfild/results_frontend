interface Reporter {
  id: string,
  name: string
}

export class Result {
  constructor(
    public _id: string,
    public reporter: Reporter,
    public math: number,
    public eng: Date,
    public phy: number,
    public chem: number,
    public bio: number,
    public average: number,
    public status: string,
    public filled_on: Date,
    public created_at: Date,
    public updated_at: Date
  ) { }
}
