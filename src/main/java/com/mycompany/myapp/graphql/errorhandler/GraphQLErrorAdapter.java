package com.mycompany.myapp.graphql.errorhandler;

//	@Autowirepackage com.mycompany.myapp.graphql.errorhandler;

import java.util.List;

import org.springframework.stereotype.Component;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;

import graphql.ErrorType;
import graphql.ExceptionWhileDataFetching;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

public class GraphQLErrorAdapter implements GraphQLError{

	private GraphQLError error;

    public GraphQLErrorAdapter(GraphQLError error) {
        this.error = error;
    }
    
	@Override
	public String getMessage() {
		return (error instanceof ExceptionWhileDataFetching) ? ((ExceptionWhileDataFetching) error).getException().getMessage() : error.getMessage();
	}

	@Override
	public List<SourceLocation> getLocations() {
		return error.getLocations();
	}

	@Override
	public ErrorType getErrorType() {
		return error.getErrorType();
	}

}