import  mongoose, {Schema, Document, ObjectId}  from "mongoose";

export interface Reaction{
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

export interface UserInput {
    thoughtText: string,
    username: string,
}

export interface ThoughtDocument extends UserInput, Document {  
    reactions: Reaction[]
    createdAt: Date;
    updatedAt: Date;
}

const reactionSchema = new Schema<Reaction>(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,  
        },
        createdAt: {
            type: Date,
        }
    }
);

const toughtSchema = new Schema<ThoughtDocument>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        reactions: [{type: reactionSchema}]
    }, 
    {
        timestamps: true
    }
);

toughtSchema.virtual("reactionCount").get(function(this: ThoughtDocument){
    return this.reactions.length;
});

toughtSchema.pre("save", async function(next){
    return next();
});

const ThoughtModel = mongoose.model<ThoughtDocument>("Thought", toughtSchema);

export default ThoughtModel;


