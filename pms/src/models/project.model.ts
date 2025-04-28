import { Schema, Document, model } from "mongoose";

interface Iproject extends Document{
    title: string,
    description: string,
    technologies: string[],
    githubLink?: string,
    docLink?: string,
    image?: string,
    liveDemoLink: string,
    developer: Schema.Types.ObjectId
}

const projectSchema = new Schema<Iproject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String] },
    githubLink: { type: String },
    docLink: { type: String },
    image: { type: String },
    liveDemoLink: { type: String },
    developer: { type: Schema.Types.ObjectId, ref: "User" }
});

const Project = model('Proejct', projectSchema);

export default Project;